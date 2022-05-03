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
    $('#pagination').append('<li>Pages: </li>');
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
    var type = document.getElementById("type").value;

    if (name == "" && picture == "" && price == "") {
        alert("All of the field must not be left blank value")
        return
    } else {
        if (name == "") {
            alert("All of the field must not be left blank value")
            return
        }
        if (picture == "") {
            alert("All of the field must not be left blank value")
            return
        }
        if (price == "") {
            alert("All of the field must not be left blank value")
            return
        }
    }
    const pictureform = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    if (!picture.match(pictureform)) {
        alert("Your picture link is invalid")
        return
    }
    var snack = {
        snackname: name,
        picture: picture,
        snackprice: price,
        snacktype: type
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
            alert("Create successfuly!");
            getSnackList();
            window.location.href = "manage_snack_list.html";
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.replace("forbidden.html");
            }
        }
    });
}

function updateSnack(id) {
    var name = document.getElementById("name").value;
    var picture = document.getElementById("image").value;
    var price = document.getElementById("price").value;
    var type = document.getElementById("type").value;

    if (name == "" && picture == "" && price == "") {
        alert("All of the field must not be left blank value")
        return
    } else {
        if (name == "") {
            alert("All of the field must not be left blank value")
            return
        }
        if (picture == "") {
            alert("All of the field must not be left blank value")
            return
        }
        if (price == "") {
            alert("All of the field must not be left blank value")
            return
        }
    }

    const pictureform = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    if (!picture.match(pictureform)) {
        alert("Your picture link is invalid")
        return
    }
    var snack = {
        id: id,
        snackname: name,
        picture: picture,
        snackprice: price,
        snacktype: type
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
            console.log(snack);
            console.log('success');
            localStorage.removeItem("snackId");
            getSnackList();
            window.location.href = "manage_snack_list.html";
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.replace("forbidden.html");
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
                window.location.replace("forbidden.html");
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