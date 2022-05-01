var SIZE = 4;
var currentPage = 1;
var isAsc = true;
var currentFieldName = "id";
var snacks = [];

function clickViewSnackList() {
    window.location.href = "http://127.0.0.1:5500/manage_snack_list.html";
}

function getSnackList() {
    // call API from server
    var url = "http://localhost:8080/snacks";
    url += "?pageNumber=" + currentPage + "&size=" + SIZE;
    url += "&sort=" + currentFieldName + "," + (isAsc ? 'ASC' : 'DESC');

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
            snacks = [];

            // error
            if (status == "error") {
                // TODO
                alert("Error when loading data");
                return;
            }

            // success
            snacks = data.content;

            //transtonextPage(id);
            fillSnackToTable();
            renderPaging(data.totalPages);
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function fillSnackToTable() {
    snacks.forEach(function (item, index) {
        var str = "";
        str += '<tr>';

        str +=
            '<td>' + item.id + '</td>' +
            '<td>' + item.snackname + '</td>' +
            '<td> <img src="' + item.picture + '" width="100" height="100"> </td>' +
            '<td>' + item.snackprice + '</td>' +
            '<td> <button class="edit" onclick="editDetails(' + item.id + ')">Edit</button > <button class="delete"  onclick="deleteDetails(' + item.id + ')">Delete</button></td >';

        str += '</tr>';
        $('tbody').append(str);
    });
}

function buildTable() {
    $('tbody').empty();
    getSnackList();
}

buildTable();

function resetPaging() {
    currentPage = 1;
}

function onClickPage(page) {
    if (currentPage == page) {
        return;
    }
    currentPage = page;
    buildTable();
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

function addSnack() {
    var name = document.getElementById("name").value;
    var picture = document.getElementById("image").value;
    var price = document.getElementById("price").value;

    var snack = {
        snackname: name,
        picture: picture,
        snackprice: price
    }

    $.ajax({
        url: 'http://localhost:8080/snacks/add',
        type: 'POST',
        data: JSON.stringify(snack),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (result) {
            // success
            getSnackList();

            window.location.href = "manage_snack_list.html";

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

function updateSnack(id) {
    var name = document.getElementById("name").value;
    var picture = document.getElementById("image").value;
    var price = document.getElementById("price").value;

    var snack = {
        id: id,
        snackname: name,
        picture: picture,
        snackprice: price
    }

    $.ajax({
        url: 'http://localhost:8080/snacks/update?id=' + id,
        type: 'PUT',
        data: JSON.stringify(snack),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (result) {
            // success
            localStorage.removeItem("snackId");
            getSnackList();

            window.location.href = "manage_snack_list.html";

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

function editDetails(id) {
    localStorage.setItem("snackId", id);
    $('body').load("manage_snack_edit.html");
}

function updateOk() {
    updateSnack(localStorage.getItem("snackId"));
}

function deleteSnack(id) {
    $.ajax({
        url: 'http://localhost:8080/snacks/delete?id=' + id,
        type: 'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (result) {
            window.location.href = "manage_snack_list.html"
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

function deleteDetails(id) {
    let text = "Do you really want to delete this field?\nEither OK or Cancel.";
    if (confirm(text) == true) {
        deleteSnack(id);
    } else {

    }
}