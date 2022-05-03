



function fillorderbill() {
    if (localStorage.getItem("price2d") === undefined) {
        var seatType = "Gold 2D"

    }
    else {
        var seatType = "Regular 2D"

    }
    var moviename = localStorage.getItem("movieName")
    var date = localStorage.getItem("playdate")
    var time = localStorage.getItem("playtime")

    var seats = localStorage.getItem("listseatId")
    var str = ""
    str += ' <p><span class="detail-info">Film: </span> <span>' + moviename + '</span></p>'
    str += '<p><span class="detail-info">Date: </span><span>' + date + '</span></p>'
    str += '<p><span class="detail-info">Time: </span> <span>' + time + '</span></p>'
    str += '<p><span class="detail-info">Seat type: </span><span>' + seatType + '</span></p>'
    str += '<p><span class="detail-info">Selected seat: </span><span>' + seats + '</span></p>'

    $('#billinformation').empty()
    $('#billinformation').append(str);

}
fillorderbill()

function calculateprice() {
    if (localStorage.getItem("price2d") === null) {
        var seatType = "Gold 2D"
        var price = localStorage.getItem("price3d")
    }
    else {
        var seatType = "Regular 2D"
        var price = localStorage.getItem("price2d")
    }
    if (localStorage.getItem("listseatId").length > 2) {
        var numseat = localStorage.getItem("listseatId").split(',').length
    } else {
        numseat = 1
    }

    var totalprice = 0
    totalprice = numseat * price
    totalpricefood = localStorage.getItem("totalpricefood")

    if (totalpricefood === null) {
        totalprice = totalprice
    } else {
        totalprice += parseInt(totalpricefood)
    }



    //var totalprice = price*numseat + 
    var str = ""
    str += '<div class="inline"><span class="detail-info">Seat type: </span> <span id="seat-type">' + seatType + '</span>'
    str += '<div class="price"><span class="quantity">' + numseat + 'x' + '</span><span class="unit-price">' + price + ' VND' + '</span></div></div>'
    str += '<div class="inline"><span class="detail-info">Snack: </span><div id="snack-list"></div><div class="inline">'
    str += '<span class="detail-info">Total price: </span><div class="price">' + totalprice + ' VND' + '</div></div>'
    $('#billcaculate').empty();
    $('#billcaculate').append(str);
    var strx = localStorage.getItem("straddfood")
    $('#snack-list').empty();
    $('#snack-list').append(strx);
}

calculateprice()

function calutalefoodandadd(num, pricefood, name) {
    var totalpricefood = 0
    strx = ""
    strx += '<div class="unit"><p class="snack-ordered">' + name + '<div class="price"><span class="quantity">' + num + 'x' + '</span>'
    strx += '<span class="unit-price">' + pricefood + ' VND' + '</span></div></p></div>'


    totalpricefood += parseInt(num) * parseInt(pricefood)
    return totalpricefood

}
function getfoodandadd(num, pricefood, name) {
    strx = ""
    strx += '<div class="unit"><p class="snack-ordered">' + name + '<div class="price"><span class="quantity">' + num + 'x' + '</span>'
    strx += '<span class="unit-price">' + pricefood + ' VND' + '</span></div></p></div>'


    return strx

}