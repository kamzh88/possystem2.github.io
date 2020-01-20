var moment = require('moment');
var orm = require("../config/orm.js");
var menu = {
    selectAll: function (cb) {
        orm.selectAll("menu", function (res) {
            cb(res);
        });
    },
    selectEmployee: function (cb) {
        orm.selectAll("employees", function (res) {
            cb(res);
            // console.log(res);
        })
    },
    selectEmployeeID: function (condition, cb) {
        orm.selectCategory("employees", condition, function(res) {
            cb(res);
        })
    },
    selectOrders: function (cb) {
        orm.selectAll("orders", function (res) {
            cb(res);
        })
    },
    selectCategory: function (condition, cb) {
        orm.selectCategory("menu", condition, function (res) {
            cb(res);
        });
    },
    deleteItem: function (condition, cb) {
        orm.delete("orders"), condition, function (res) {
            cb(res);
        }
    },
    del: function (condition, cb) {
        // console.log(conditon);
        orm.delete("menu", condition, function (res) {
            cb(res);
        })
    },
    delete: function (condition, cb) {
        // console.log(conditon);
        orm.delete("employees", condition, function (res) {
            cb(res);
        })
    },
    insertItem: function (cols, vals, cb) {
        orm.insertOne("menu", cols, vals, function (res) {
            cb(res);
            // console.log(res);
        })
    },
    insertEmployee: function (cols, vals, cb) {
        orm.insertEmployee("employees", cols, vals, function (res) {
            cb(res);

        })
    },
    insertOrder: function (cols, vals, cb) {
        orm.insertOrder("orders", cols, vals, function (res) {
            cb(res);
            // console.log(res);
        })
    },
    updateOne: function (objColVals, condition, cb) {
        // console.log(objColVals);
        // console.log(condition);
        orm.updateOne("menu", objColVals, condition, function (res) {
            cb(res);
        })
    },
    date: function (cb) {

        var date = moment().format("MM/DD/YYYY");
        var time = moment().format('hh:mm:ssA');
        cb(time, date);

    },
};
module.exports = menu;


