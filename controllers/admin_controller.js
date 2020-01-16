var express = require("express");
var path = require("path");

var router = express.Router();
var menu = require("../models/adminModel.js");

router.get("/", function (req, res) {
    res.render('index');
});

router.get("/admin", function (req, res) {
    // console.log(req);
    // res.sendFile(path.join(__dirname, "../views/admin.handlebars"));
    res.render('admin', { title: 'Menu Page' });
});

router.get("/cashier", function (req, res) {
    // console.log(req);
    // res.sendFile(path.join(__dirname, "../views/admin.handlebars"));
    res.render('cashier', { title: 'Menu Page' });
});

// router.get("/admin/cashier", function (req, res) {
//     var condition = req;
//     console.log(condition);

//     // res.json({cashierID: condition});
//     // res.sendFile(path.join(__dirname, "../views/admin.handlebars"));
//     // res.render('admin');
//     // window.location.assign('admin', {title: 'Menu Page', resultID: id});
// })

router.get("/api/orders", function (req, res) {
    menu.selectOrders(function (data) {
        res.json({ orders: data });
    });
});

router.get("/api/employee", function (req, res) {
    menu.selectEmployee(function (data) {
        // console.log(req.params.employee_positon);
        res.json({ employee: data });
    });
});

router.get("/api/menu", function (req, res) {
    menu.selectAll(function (data) {
        res.json({ menu: data });
    });
});

router.get("/api/moment", function (req, res) {
    menu.date(function (time, date) {

        res.json({
            time,
            date
        })
        // console.log(time);
    });
});

router.get("/api/menu/:category", function (req, res) {
    var category = JSON.stringify(req.params.category)
    var condition = "category = " + category;
    // console.log(condition);
    // console.log(req);
    menu.selectCategory(condition, function (data) {
        res.json({ menu: data });
    });
});


router.delete("/api/employee/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log(condition);
    menu.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    })
})

router.delete("/api/menu/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    // console.log(condition);
    menu.del(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    })
})

router.post("/api/menu", function (req, res) {
    // console.log(req);
    menu.insertItem(
        ["item_name", "category", "selected", "price"],
        [req.body.item_name, req.body.category, req.body.selected, req.body.price],
        function (result) {
            res.json({ id: result.insertId });

        }
    )
})

router.post("/api/employee", function (req, res) {
    // console.log(req.body);
    menu.insertEmployee(
        ["employee_position", "employee_firstName", "employee_lastName", "employee_id"],
        [req.body.employee_position, req.body.employee_firstName, req.body.employee_lastName, req.body.employee_id],
        function (result) {
            // console.log(res);
            res.json({
                employee_position: req.body.employee_position,
                employee_firstName: req.body.employee_firstName,
                employee_lastName: req.body.employee_lastName,
                employee_id: req.body.employee_id
            });
        }
    )
})

router.post("/api/orders", function (req, res) {
    // console.log(req);
    menu.insertOrder(
        ["itemize_id", "subtotal", "taxes", "total", "time", "date"],
        [req.body.itemize_id, req.body.subtotal, req.body.taxes, req.body.total, req.body.time, req.body.date],
        function (result) {
            res.json({
                itemize_id: req.body.itemize_id,
                subtotal: req.body.subtotal,
                taxes: req.body.taxes,
                total: req.body.total,
                time: req.body.time,
                date: req.body.date
            });
            // console.log(req.body);
        }
    )
})

// router.get("/api/employee/:id", function (req, res) {
//     var condition = "id = " + req.params.id;
//     // console.log(condition);
//     menu.selectEmployeeID(condition, function (data) {
//         // console.log(req.params.employee_positon);
//         // console.log(data);    
//         // res.sendFile(__dirname + '../views/admin.handlebars');
//         // if (error) {
//         //     return res.render('error');
//         // }
//         res.json({ employee: data });
//         // res.sendFile(path.join(__dirname + "../views/admin.handlebars"));
       
        


//     });

// })

router.put("/api/menu/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    // console.log(condition);
    menu.updateOne({
        item_name: req.body.item_name,
        category: req.body.category,
        selected: req.body.selected,
        price: req.body.price
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            // console.log(req.body.item_name);
            res.json({
                id: req.params.id,
                item_name: req.body.item_name,
                category: req.body.category,
                selected: req.body.selected,
                price: req.body.price
            });
        }
    })
})

module.exports = router;