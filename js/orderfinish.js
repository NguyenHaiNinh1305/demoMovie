
$("#next-button").click(function () {
    if (window.confirm("Create order now")) {
        alert()
        if ((localStorage.getItem("selectedidfood") !== null)) {
            if (localStorage.getItem("selectedidfood") !== '') {
                var idfood = localStorage.getItem("selectedidfood").split(",")
            } else {
                var idfood = localStorage.getItem("selectedidfood")
            }

        } else {
            var idfood = localStorage.getItem("selectedidfood")
        }

        if (idfood === "" || idfood === null) {
            createTicket()
            return
        } else {
            var totalpricefood = 0
            var str = ''
            idfood.forEach(function (item, index) {
                strp = 'clickplus' + (item + '')
                strn = 'seletedFoodname' + (item + '')
                strt = 'seletedFoodprice' + (item + '')
                var num = document.getElementById(strp).innerHTML
                var name = document.getElementById(strn).innerHTML
                var pricefood = document.getElementById(strt).innerHTML
                var id = item
                createSnackOdl(id, num)
                totalpricefood += parseInt(calutalefoodandadd(num, pricefood, name))
                str += getfoodandadd(num, pricefood, name)
            })

            localStorage.setItem("totalpricefood", totalpricefood)
            localStorage.setItem("straddfood", str)
        }

        createTicket()


        // 

    } else {
        return
    }


})
//create ticket
function createTicket() {
    var price
    if (localStorage.getItem("price2d") === undefined) {
        price = localStorage.getItem("price3d")

    } else {
        price = localStorage.getItem("price2d")
    }

    var movieId = localStorage.getItem("movieId")
    var today = new Date();
    var time = "0" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var listseat = localStorage.getItem("listseatId")
    price = price * listseat.split(",").length

    var ticket = {
        id: 1,
        movieID: movieId,
        accomTime: time,
        ticketPrice: price
    }

    var url = "http://localhost:8080/tickets/add?seatID="

    url += listseat
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(ticket),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (data) {
            // success
            alert('ok')
            getticketid()



        },
        error(jqXHR, textStatus, errorThrown) {
            alert('l')
            if (jqXHR.status == 403) {
                window.location.href = "http://localhost:5501/html/forbidden.html";
            } else {
                console.log();
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });

}

// create odlt
function createODLTicket() {

    var type
    if (localStorage.getItem("price2d") === undefined) {
        type = 'gold'

    } else {
        type = 'regular'
    }


    var listseat = localStorage.getItem("listseatId")
    num = listseat.split(",").length
    var ODLT = {
        ticketID: localStorage.getItem("ticketId"),
        tickeType: type,
        ticketNum: num
    }

    var url = "http://localhost:8080/ODLs/add"
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(ODLT),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (data) {
            // success
            getorderLineTicketstid()

        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.href = "http://localhost:5501/html/forbidden.html";
            } else {
                console.log();
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });

}

function createSnackOdl(id, num) {


    var ODLT = {
        snackID: id,
        snacknumber: num,
        snackType: 'middle'
    }
    var url = "http://localhost:8080/orderlineSnacks/add"
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(ODLT),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (data) {
            // successalert('ok')

        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.href = "http://localhost:5501/html/forbidden.html";
            } else {
                console.log();
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });
}

function createOrder() {

    var odlts = localStorage.getItem("orderLineTicketsId")
    var today = new Date();

    var date = today.getFullYear() + '-' + "0" + (today.getMonth() + 1) + '-' + today.getDate();
    var ODLT = {
        orderDate: date,
        timeStart: "11:11:11",
        payment: 'card',
        orderlineTicketID: odlts
    }
    var url = "http://localhost:8080/orders/add"
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(ODLT),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (data) {
            // success
            window.location.href = "http://127.0.0.1:5500/staff_order_success.html"

        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.href = "http://localhost:5501/html/forbidden.html";
            } else {
                console.log();
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });
}


function getorderLineTicketstid() {
    // call API from server
    var url = "http://localhost:8080/ODLs";

    $.ajax({
        url: url,
        type: 'GET',
        contentType: "application/json", // type of body (json, xml, text)
        dataType: 'json', // datatype return
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (data, textStatus, xhr) {
            // reset list employees
            var orderLineTickets = [];
            orderLineTickets = data.content;
            var orderLineTicketsId = orderLineTickets[orderLineTickets.length - 1].id
            localStorage.setItem("orderLineTicketsId", orderLineTicketsId)
            createOrder()

        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}





//get ticket id

function getticketid() {

    var url = "http://localhost:8080/tickets";

    $.ajax({
        url: url,
        type: 'GET',
        contentType: "application/json", // type of body (json, xml, text)
        dataType: 'json', // datatype return
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (data) {
            var tickets = [];
            tickets = data.content;
            var ticketId = tickets[tickets.length - 1].id
            localStorage.setItem("ticketId", ticketId)
            createODLTicket()


        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}