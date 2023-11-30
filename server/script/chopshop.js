
require('mysql');
const database = require("../chopshop/database");

global.chopShops = [];


global.IsInRange = (player, x, y, z, range) => {
    x = parseFloat(x), y = parseFloat(y), z = parseFloat(z), range = parseInt(range);
    let dist = player.dist(new mp.Vector3(x,y,z))
    if(dist < range) return true;
    return false;
}


function createChopShopEntities(id, position, shutdown, totalcars) {

    var text;

    if(shutdown > 0)
    {
        text = `ChopShop (${id})\nStatus: ~r~Closed`;
    }
    else
    {
        text = `ChopShop (${id})\nStatus: ~g~Open`;
    }
    chopShops[id] = {

        chopid: id,
        marker: mp.markers.new(1, new mp.Vector3(position.x, position.y, position.z - 1.5), 2.0, {
            color: [225, 225, 225, 255]
        }),

        label: mp.labels.new(text, position,
        {
            los: true,
            font: 4,
            drawDistance: 20.0,
            color: [225, 225, 225, 255]
        }),

        raided: shutdown,

        location: position,

        totalchops: totalcars,

        inUse: false
    };
}

module.exports.updateChopInUse =  function(id)
{
    if(chopShops[id].inUse === false){
        chopShops[id].inUse = true;
        console.log("this is called if")
    }
    else {
        chopShops[id].inUse = false;
        console.log("this is called else")
    }
}

// module.exports.updateChopRaided =  function(id)
// {
//     let chopshop = chopShops[id];
//     chopshop.raided = 1;
//     updateChopShop(id, chopshop.location, chopshop.raided, chopshop.totalchops);

// }


function updateChopShop(id, position, shutdown, totalcars)
{
    deleteChopShopEntities(id);
    delete chopShops[id];
    createChopShopEntities(id, position, shutdown, totalcars);
}
function deleteChopShopEntities(id) {
    if (chopShops[id]) {
        if (chopShops[id].marker) chopShops[id].marker.destroy();
        if (chopShops[id].label) chopShops[id].label.destroy();
    }
}

module.exports.init =  function(){

        database.pool.query("SELECT * FROM veh_chopshop", (error, rows) => {
        if (error) {
            console.log(`Chopshop loading failed: ${error.message}`);
        } else {
            rows.forEach((row) => createChopShopEntities(row.id, new mp.Vector3(row.posX, row.posY, row.posZ), row.shutdown, row.totalcars));
            console.log(`Loaded ${rows.length} Chopshop(s).`);
        }
        });
};


module.exports.createChopShop = function(position) {
    return new Promise((resolve, reject) => {
        database.pool.query("INSERT INTO veh_chopshop (posX, posY, posZ) VALUES (?, ?, ?)", [position.x, position.y, position.z], (error, result) => {
            if (error) {
                console.log(`Chopshop adding failed: ${error.message}`);
                reject(error);
            } else {
                createChopShopEntities(result.insertId, position);
                resolve(result.insertId);
            }
        });
    });
};


module.exports.updateChopShopPosition = function(id, position) {
        database.pool.query("UPDATE veh_chopshop SET posX=?, posY=?, posZ=? WHERE ID=?", [position.x, position.y, position.z, id], (error, result) => {
            if (error) {
                console.log(`Chopshop adding failed: ${error.message}`);
                console.log("thhis is classed")
            } else {
                updateChopShop(id, position, chopShop[id].raided, chopShops[id].totalchops);
                console.log("thhis is classed")
            }
        });

};

module.exports.deleteChopShop = function(id) {
    return new Promise((resolve, reject) => {
        database.pool.query("DELETE FROM veh_chopshop WHERE ID=?", [id], (error, result) => {
            if (error) {
                console.log(`Chopshop removing failed: ${error.message}`);
                reject(error);
            } else {
                if (result.affectedRows > 0) {
                    deleteChopShopEntities(id);
                    delete chopShops[id];
                }

                resolve(result.affectedRows);
            }
        });
    });
};

module.exports.returnNearestChopShop = function(player) {
    let result;
    chopShops.every((cs) => {
        result = IsInRange(player, cs.location.x, cs.location.y, cs.location.z, 5);
        if(result)
        { 
            result = cs; 
            return false; 
        }
        else return true;
    });
    // console.log(result);
    return result;

};
