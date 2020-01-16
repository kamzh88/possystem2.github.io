export { updateTime, orderButton };

function updateTime() {
    $.ajax("/api/moment", {
        type: "GET"
    }).then(function (time, date) {
        var dateData = time.date;
        var timeData = time.time;
        var timeDiv = $('.time');
        timeDiv.text(dateData + "   " + timeData);
    })
}

function orderButton() {
    $.ajax("/api/menu", {
        type: "GET"
    }).then(function (data) {
        $(document).on("click", "#order-list", function (event) {
            $.ajax("/api/orders", {
                type: "GET"
            }).then(function (orders) {
                // console.log("orders" + orders);

                var dateArray = [];
                var subtotalArray = [];
                var taxArray = [];
                var totalArray = [];
                // var itemNameArray = [];
                var order_div = $(".body3");


                // for (var i = 0; i < orders.orders.length; i++) {
                //     // console.log("Ticket Number: " + orders.orders[i].id);
                //     var ticketNumber = orders.orders[i].id;
                //     var date = orders.orders[i].date;
                //     var time = orders.orders[i].time;

                //     // var subtotal = orders.orders[i].subtotal;
                //     // var tax = orders.orders[i].taxes;
                //     // var total = orders.orders[i].total;
                //     // subtotalArray.push(subtotal);
                //     // taxArray.push(tax);
                //     // totalArray.push(total);
                //     // console.log(date);
                //     // ticketNumberArray.push(ticketNumber);
                //     for (var j = 0; j < orders.orders[i].itemize_id.length; j++) {
                //         for (var k = 0; k < data.menu.length; k++) {
                //             var itemID = parseFloat(orders.orders[i].itemize_id[j]);
                //             if (itemID === data.menu[k].id) {
                //                 var item_name = data.menu[k].item_name;
                //                 var item_price = data.menu[k].price;
                //                 itemNameArray.push(item_name);
                //     //             // console.log(orders.orders[i].subtotal);
                //     //             var order_elem = `
                //     //                 <div id="collapse${i}" class="panel-collapse collapse">
                //     //                 <div class="panel-body">
                //     //                 <p>${item_name} $${item_price}</p>
                //     //                 </div>
                //     //                 </div>`
                //     //             order_div.append(order_elem);
                //             }
                //         }
                //     }
                //     // console.log("subtotal: " + subtotalArray);
                //     // console.log("tax: " + taxArray);
                //     // console.log("total: " + totalArray);
                //     console.log(itemNameArray);
                //     var new_elem = `
                //         <div class= "order"
                //         <h4 class="panel-title"><a data-toggle="collapse" href="#collapse${i}">${ticketNumber} ${date} ${time}</a></h4></div>
                //         <div id="collapse${i}" class="panel-collapse collapse">
                //         <div class="panel-body">
                //         </p>${itemNameArray[i]}</p>

                //         </div>
                //         </div>`;
                //     order_div.append(new_elem);
                // <p>${itemNameArray[i]} $${item_price}</p>
                // var order_elem = `
                //     <div id="collapse${i}" class="panel-collapse collapse">
                //      <div class="panel-body">
                //      <p>Subtotal: ${subtotalArray[i]}</p>
                //      <p>Taxes: ${taxArray[i]}</p>
                //     <p>Total: ${totalArray[i]}</p>
                //     </div>
                //     </div>
                //     `
                // order_div.append(order_elem);
                // }


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
                            Subtotal: <span class="boldCSS"></span>
                        </div>
                        <div class="taxCSS">
                            Tax: <span class="boldCSS"></span>
                        </div>
                        <div class="totalCSS">
                            Total: <span class="boldCSS"></span>
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

                // console.log("subtotal: " + subtotalArray);
                // console.log("tax: " + taxArray);
                // console.log("total: " + totalArray);
                // var order_elem = `

                //      <p>Subtotal: ${subtotalArray[i]}</p>
                //      <p>Taxes: ${taxArray[i]}</p>
                //     <p>Total: ${totalArray[i]}</p>

                //     `
                // order_div.append(order_elem);
                // <div id="collapse${i}" class="panel-collapse collapse">
                // <div class="panel-body">
                // </div>
                //     </div>
            })
        })
    })
}