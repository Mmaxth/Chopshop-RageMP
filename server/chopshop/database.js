const mysql = require("mysql");
const config = require("./config.json");

module.exports = {
    pool: undefined,

    init: function(callback) {
        this.pool = mysql.createPool(config.database);

        this.pool.getConnection((error, connection) => {
            if (error) {
                console.log(`Database connection failed: ${error.message}`);
            } else {
                console.log("Connected to the database.");
                callback();
            }

            connection.release();
        });
    }
};