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

}