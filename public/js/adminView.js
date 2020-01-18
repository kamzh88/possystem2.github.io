import { updateTime } from './utils.js';

$(document).ready(function () {
    var tax;
    var total;
    $.ajax("/api/menu", {
        type: "GET"
    }).then(function (data) {
        $.ajax("/api/moment", {
            type: "GET"
        }).then(function (time) {

            var itemize = [];
            var timeData = time.time;
            var dateData = time.date;
            var itemID = [];
            var subTotal;
            var priceArray = [];
            var categoryElem = $('#category-div');
            // console.log(data);

            //append category onto the page
            var category = ["Chicken", "Beef", "Appetizers", "Vegetables", "Seafood"];
            var len = category.length;
            for (var i = 0; i < len; i++) {
                var new_elem = `<button class='categorybtn' data-id=${data.menu} data-category=${category[i]}>${category[i]}</button>`
                categoryElem.append(new_elem);
            }

            //categorybtn data
            $(document).on("click", ".categorybtn", function (event) {
                var itemsDiv = $('#items-div');
                var categorybtn = $(this).data("category");
                var len = data.menu.length;
                itemsDiv.empty();
                for (var i = 0; i < len; i++) {
                    if (categorybtn === data.menu[i].category) {
                        var itemName = data.menu[i].item_name
                        var new_elem = `<button class='itembtn' data-id=${data.menu[i].id} data-item=${itemName}>${itemName}</button>`
                        itemsDiv.append(new_elem);
                    };
                }
            })


            //itemID is the ID of the on click function
            $(document).on("click", ".itembtn", function (event) {
                var id = $(this).data("id");
                var orderDiv = $('#order-div');
                var len = data.menu.length;
                for (var i = 0; i < len; i++) {
                    if (id === data.menu[i].id) {
                        var itemName = data.menu[i].item_name;
                        var itemPrice = data.menu[i].price;
                        var new_elem = `
                        <button type="button" class="onClickItem" data-id=${id}><span class="item-name" data-id=${id}>${itemName}</span><span class="boldPriceCSS">$${itemPrice}</span></button>
                            `;
                        orderDiv.append(new_elem);
                        priceArray.push(parseFloat(itemPrice));
                        subTotal = priceArray.reduce((a, b) => a + b, 0)
                        totals(subTotal);
                        itemID.push(id);
                    };
                }
            })
            var deleteIDArray = [];
            $(document).on("click", ".onClickItem", function (event) {
                    $( this ).toggleClass( "changeState" );
                    var deleteID = $(this).data("id");
                    deleteIDArray.push(deleteID);
                    
            })
  
            $(document).on("click", ".orderReceiptDeleteButton", function (event) {
                console.log(deleteIDArray);
            })


            $(".form-orderlist").on("submit", function (event) {
                event.preventDefault();
                var len = data.menu.length;
                for (var i = 0; i < len; i++) {
                    for (var j = 0; j < len; j++) {
                        if (itemID[j] === data.menu[i].id) {
                            var idItem = data.menu[i].id;
                            itemize.push(idItem);
                        };
                    };
                };
                var customerOrder = {
                    itemize_id: itemize,
                    subtotal: subTotal,
                    taxes: tax,
                    total: total,
                    time: timeData,
                    date: dateData,
                }
                $.ajax("/api/orders", {
                    type: "POST",
                    data: JSON.stringify(customerOrder),
                    dataType: 'json',
                    contentType: "application/json"
                }).then(function (result) {
                    location.reload();
                    // console.log(result);
                })
            })

            //Edit Menu Button on main page
            $(document).on("click", "#menu-changes", function (event) {
                // console.log(data.menu);
                var menuElem = $(".modal-body");
                var items = data.menu;
                var len = data.menu.length;
                for (var i = 0; i < len; i++) {
                    var new_elem = `
                <ul class="edit-heading"> ${items[i].id}. ${items[i].item_name}   $${items[i].price}
                <button class='delete-item' data-id=${items[i].id}><i class="fas fa-window-close"></i></button>
                <h4 class="panel-title"><a data-toggle="collapse" href="#collapse${i}">Edit</a></h4>
                <div id="collapse${i}" class="panel-collapse collapse">
                  <div class="panel-body">
                  <form class="edit-form" data-id="${items[i].id}">
                      <div class="form-group">
                          <label for="new-name${i}">Item Name</label>
                          <input type="text" class="item-name" >
                      </div>
                      <div class="form-group">
                          <label for="exampleFormControlSelect1">Category</label>
                          <select class="form-control" class="new-name${i}">
                              <option>Chicken</option>
                              <option>Beef</option>
                              <option>Seafood</option>
                              <option>Vegetables</option>
                              <option>Appetizers</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="">Price</label>
                          <input type="text" class="form-control" class="new-item-price${i}">
                      </div>
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary submit">Save</button>
                  </form>
                  </div>
                </div></ul>`

                    menuElem.append(new_elem);
                };

                //Save button in edit button modal
                $(".edit-form").on("submit", function (event) {
                    event.preventDefault();
                    var id = $(this).data("id");
                    var itemName = $(event.target).closest("item-name").context[0].value;
                    var categoryName = $(event.target).closest("item-name").context[1].value;
                    var itemPrice = $(event.target).closest("item-name").context[2].value;
                    var editItem = {
                        item_name: itemName,
                        category: categoryName,
                        selected: 0,
                        price: itemPrice
                    };
                    // console.log(editItem);
                    $.ajax("/api/menu/" + id, {
                        type: "PUT",
                        data: JSON.stringify(editItem),
                        dataType: 'json',
                        contentType: 'application/json'
                    }).then(function (data) {
                        // console.log("menu item changed", id);
                        location.reload();
                        // console.log(data);
                        $(event.target).closest(".edit-heading").html(`
                    <ul class="edit-heading"> ${id}. ${data.item_name}   $${data.price}
                    <button class='delete-item' data-id=${id}>DELETE</button>
                    <h4 class="panel-title"><a data-toggle="collapse" href="#collapse${i}">Edit</a></h4>
                    <div id="collapse${i}" class="panel-collapse collapse">
                      <div class="panel-body">
                      <form class="edit-form" data-id="${id}">
                          <div class="form-group">
                              <label for="new-name${i}">Item Name</label>
                              <input type="text" class="item-name" >
                          </div>
                          <div class="form-group">
                              <label for="exampleFormControlSelect1">Category</label>
                              <select class="form-control" class="new-name${i}">
                                  <option>Chicken</option>
                                  <option>Beef</option>
                                  <option>Seafood</option>
                                  <option>Vegetables</option>
                                  <option>Appetizers</option>
                              </select>
                          </div>
                          <div class="form-group">
                              <label for="">Price</label>
                              <input type="text" class="form-control" class="new-item-price${i}">
                          </div>
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="submit" class="btn btn-primary submit">Save</button>
                  </form>
                      </div>
                    </div></ul>`);
                    })
                })
            });
            $(document).on("click", "#order-list", function (event) {
                $.ajax("/api/orders", {
                    type: "GET"
                }).then(function (orders) {
                    
                    
                    var dateArray = [];
                    var subtotalArray = [];
                    var taxArray = [];
                    var totalArray = [];
                    // var itemNameArray = [];
                    var order_div = $(".body3");

                    for (var i = 0; i < orders.orders.length; i++) {
                        // console.log("Ticket Number: " + orders.orders[i].id);
                        var ticketNumber = orders.orders[i].id;
                        var date = orders.orders[i].date;
                        var time = orders.orders[i].time;
                        var ticketNumber_elem = `
                            <button data-dismiss="modal" id="modal3" data-ticket=${ticketNumber} class= "order">
                            ${ticketNumber}. ${date} ${time}</button><br>`;
                        order_div.append(ticketNumber_elem)
                    }

                    $(document).on("click", `.order`, function (event) {
                        var orderScreen = $(".orderGrid");
                        orderScreen.empty();
                        var ticket = $(this).data("ticket");
                        var orderDiv = $('#order-div');
                        
                        for (var j = 0; j < data.menu.length; j++) {
                            var dataID = data.menu[j].id
                            // console.log("dataID:" + dataID);
                        }

                        for (var i = 0; i < orders.orders.length; i++) {
                            var dataTicketNumber = orders.orders[i].id;
                            if (ticket === dataTicketNumber) {
                                var itemize_id = orders.orders[i].itemize_id.split(',');
                                var subtotal = orders.orders[i].subtotal;
                                var taxes = orders.orders[i].taxes;
                                var total = orders.orders[i].total;
                            }
                        }

                        console.log((itemize_id));
                        var itemNameArray = [];
                        var itemPriceArray = [];
                        for (var k = 0; k < itemize_id.length; k++) {
                            for (var l = 0; l < data.menu.length; l++) {
                                var dataID = data.menu[l].id
                                if (itemize_id[k] == dataID) {
                                    var itemName = data.menu[l].item_name;
                                    var itemPrice = data.menu[l].price
                                    console.log(data.menu[l]);
                                    itemNameArray.push(itemName);
                                    itemPriceArray.push(itemPrice);
                                }

                            }

                        }

                        var new_elem = `
                        <form class="form-orderlist">
                        <h1 id="order-heading">Ticket # ${ticket}</h1><br>
                        <div id="order-div">
                            <div><span class="item-name"></span></div>
                                    </div>
                        </div>
                        <div <div id="total">
                        <div class="totalGrid">
                            <div class="subtotalCSS">
                                Subtotal: <span class="boldPriceCSS">${subtotal}</span>
                            </div>
                            <div class="taxCSS">
                                Tax: <span class="boldPriceCSS">${taxes}</span>
                            </div>
                            <div class="totalCSS">
                                Total: <span class="boldPriceCSS">${total}</span>
                            </div>
                        </div></div>
                        <div class="orderButtons">
                            <button type="submit" class="btn btn-primary submit">Quit</button>
                        </div>
                        </form>`;
                        orderScreen.append(new_elem);

                        for (var k = 0; k < itemize_id.length; k++) {
                            var itemNameDiv = $(".item-name")
                            var item_elem = `
                            ${itemNameArray[k]} <span class="boldCSS">$${itemPriceArray[k]}</span><br>
                        `
                            itemNameDiv.append(item_elem);
                        }
                    });
                })
            })
        });
    })

    function totals(subTotal) {
        var totalDiv = $("#total");
        totalDiv.empty();
        tax = (subTotal * .06625).toFixed(2);
        total = (subTotal * 1.06625).toFixed(2);
        // console.log("subtotal " + subTotal);
        // console.log("taxes " + tax);
        // console.log("Total: " + total);
        var total_elem = `
        <div class="totalGrid">
            <div class="subtotalCSS">
                Subtotal: <span class="boldPriceCSS">$${subTotal.toFixed(2)}</span>
            </div>
            <div class="taxCSS">
                Tax: <span class="boldPriceCSS">$${tax}</span>
            </div>
            <div class ="totalCSS">
                Total: <span class="boldPriceCSS">$${total}</span>
            </div>
        </div>
         `
        totalDiv.append(total_elem);
    }

    //create new items button
    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        var itemName = $("#item-name").val().trim();
        var categoryName = $("#category-name").val().trim();
        var itemPrice = $("#item-price").val().trim();
        var newItem = {
            item_name: itemName,
            category: categoryName,
            selected: 0,
            price: itemPrice
        };
        // console.log(newItem);
        $.ajax("/api/menu", {
            type: "POST",
            data: JSON.stringify(newItem),
            dataType: 'json',
            contentType: "application/json"
        }).then(function (result) {
            location.reload();
            // console.log(result);
        })
    })
    $(document).on("click", "#logOut", function (event) {
        window.location.assign("/");
    })
    //delete item button
    $(document).on("click", ".delete-item", function (event) {
        var id = $(this).data("id");
        // console.log(id);
        $.ajax("/api/menu/" + id, {
            type: "DELETE"
        }).then(function () {
            // console.log("Item has been deleted!");
            location.reload();
        });
    });

    //exampleModalLong2 Close button
    $(document).on("click", "#modal2", function (event) {
        $(".edit-heading").remove();
    });

    //exampleModalLong3 Close button
    $(document).on("click", "#modal3", function (event) {
        $(".order").remove();
        $(".body3").empty();
    });

    setInterval(updateTime, 1000);
    updateTime();
})

