let chopScript = require('../script/chopshop.js');


mp.events.addCommand("createchopshop", (player) => {
        chopScript.createChopShop(player.position).then((id) => {
            player.outputChatBox(`chopshop created. ID: ${id}`);
        }, (error) => {
            player.outputChatBox("Failed to create a chopshop, check console for details." + error);
        });
});

mp.events.addCommand("removechopshop", (player, chopID) => {
        chopID = Number(chopID);

        if (isNaN(chopID)) {
            player.outputChatBox("!{#FF8555}SYNTAX: !{#FFFFFF}/removechopshop [ID]");
            return;
        }

        chopScript.deleteChopShop(chopID).then((affected) => {
            if (affected > 0) {
                player.outputChatBox(`ChopShop #${chopID} removed.`);

            } else {
                player.outputChatBox("No changes made, you might have entered an invalid chopshop ID.");
            }
        }, (error) => {
            player.outputChatBox("Failed to remove chopshop, check console for details.");
        });
});

mp.events.addCommand("chopveh", (player) => {
    let chopshop = chopScript.returnNearestChopShop(player);
    if(chopshop === false){
        player.outputChatBox("You are not in range of a chopshop"); 
        return;
    }else {
        if(!player.customData.chopping){
            if(chopshop.raided < 1)
            {
                if(chopshop.inUse === false)
                {
                    if(!player.vehicle)
                    { 
                        player.outputChatBox("You are not in a car"); 
                        return; 
                    }
                    console.log("working: " + chopshop.chopid);
                    let chopshopID = chopshop.chopid;
                    player.call('GetVehicleClassAndMoney', [chopshopID]);
                    return;
                } else  player.outputChatBox("Chopshop is being used!"); return;
            }
            else  player.outputChatBox("This chopshop is closed!"); return;
        }
        else  player.outputChatBox("You are already using the chopshop"); return;
    }
});

// mp.events.addCommand("shutdownchop", (player) => {
//     let chopshop = chopScript.returnNearestChopShop(player);
//     if(chopshop === false){
//         player.outputChatBox("You are not in range of a chopshop"); 
//         return;
//     } else {
//                 if(chopshop.inUse === false)
//                 {
//                     chopScript.updateChopRaided(chopshop.chopid);
//                 } else  player.outputChatBox("Chopshop is being used!"); return;
//             }
// });


