var SIZE = 4;
var currentPage = 1;
var orders = [];




function getListorders() {
    // call API from server
    var url = "http://localhost:8080/orders";

    url += "?pageNumber=" + currentPage + "&size=" + SIZE;

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
            orders = [];
            orders = data.content;
            fillordersToTable();
            renderPaging(data.totalPages);

        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}


function fillordersToTable() {

    orders.forEach(function (item, index) {

        var str = "";
        str += '<tr>';

        str += '<td>' + item.id + '</td> <td>' + item.orderlineTicketTicketMovieName + '</td><td>' + item.orderlineTicketTicketAccomTime + '</td><td><button class="delete"  onclick = deleteOrder(' + item.id + ')>Delete</button></td>'

        str += '</tr>';
        $('tbody').append(str);



    })


}


function buildordersTable() {
    $('tbody').empty();
    getListorders();
}


$("#view-history").click(function () {

    // $(document).ready(function () {
    //     window.location.replace("admin_manage_movie_list.html");
    // });
    window.location.href = "http://127.0.0.1:5500/view_history_order.html"


})
buildordersTable();

function resetPaging() {
    currentPage = 1;
}

function onClickPage(page) {
    if (currentPage == page) {
        return;
    }
    currentPage = page;
    buildordersTable();
}

function renderPaging(totalPages) {
    $('#pagination').empty();
    for (let index = 1; index <= totalPages; index++) {
        $('#pagination').append(
            '<li class="page-item">' +
            '<a class="page-link" onClick="onClickPage(' + index + ')">' + index + '</a>' +
            '</li>'
        );
    }
}

function deleteOrder(id) {

    $.ajax({
        url: 'http://localhost:8080/orders/delete?id=' + id,
        type: 'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (result) {
            // success


            window.location.href = "http://127.0.0.1:5500/view_history_order.html"

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