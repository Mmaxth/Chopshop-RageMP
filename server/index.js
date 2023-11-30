// Init ChopShops
let database = require('./chopshop/database.js');
// require('./script/chopshop.js');
// require('./chopshop/commands.js');
const fs = require("fs");
const path = require("path");


database.init(() => {
    // require('./script/chopshop.js');
    // require('./chopshop/commands.js');
    loadFiles("script", "chopshop");
});

function loadFiles(...dirNames) {
    dirNames.forEach((dirName) => {
        let finalPath = path.join(__dirname, dirName);

        fs.readdir(finalPath, (error, files) => {
            if (error) {
                console.log(`Failed reading directory "${dirName}": ${error.message}`);
            } else {
                files.forEach((file) => {
                    try {
                        if (dirName === "script") {
                            require(path.join(finalPath, file)).init();
                        } else {
                            require(path.join(finalPath, file));
                        }

                        console.log(`Loaded file "${file}" from "${dirName}".`);
                    } catch (e) {
                        console.log(`Failed loading file "${file}" from "${dirName}": ${e.message}`);
                    }
                });
            }
        });
    });
};