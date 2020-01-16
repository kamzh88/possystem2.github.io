var connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string") {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}
var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        // console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
            // console.log(result);
        });
    },
    selectCategory: function (tableInput, condition, cb) {
        var queryString = `SELECT * FROM ${tableInput} WHERE ${condition};`;
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            // console.log(result);
            cb(result);
        });
    },
    delete: function (table, condition, cb) {
        var queryString = `DELETE FROM ${table} WHERE ${condition}`;
        // console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    insertOne: function (table, cols, vals, cb) {
        var queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;
        // console.log(queryString);
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
            // console.log(result);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;
        // console.log(queryString);
        connection.query(queryString, function(err, result) {
            if(err){
                throw err;
            }
            cb(result);
        })
    },
    insertOrder: function (table, cols, vals, cb) {
        var vals0 = vals[0].join(",")
        vals0 = JSON.stringify(vals0);
        vals4 = JSON.stringify(vals[4]);
        vals5 = JSON.stringify(vals[5]);
        var queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${vals0},${vals[1]},${vals[2]},${vals[3]},${vals4},${vals5})`;
        // console.log(queryString);
        // console.log(vals0)
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
            // console.log(result);
        });
    },
    insertEmployee: function (table, cols, vals, cb) {
        var vals0 = vals[0].join(",");
        vals0 = JSON.stringify(vals0);
        vals1 = JSON.stringify(vals[1]);
        vals2 = JSON.stringify(vals[2]);
        // console.log(vals0);
        var queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${vals0},${vals1},${vals2},${vals[3]})`;
        // console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    }
}
module.exports = orm;