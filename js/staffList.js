var SIZE = 4;
var currentPage = 1;
var isAsc = true;
var currentFieldName = "id";
var staffs = [];

function clickViewStaffList() {
    window.location.href = "http://127.0.0.1:5500/manage_staff_account_list.html";
}

function getStaffList() {
    // call API from server
    var url = "http://localhost:8080/api/accounts";
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
            staffs = [];

            // error
            if (status == "error") {
                alert("Error when loading data");
                return;
            }

            // success
            staffs = data.content;

            fillStaffToTable();
            renderPaging(data.totalPages);

        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function fillStaffToTable() {
    staffs.forEach(function (item, index) {
        var str = "";
        str += '<tr>';
        str +=
            '<td>' + item.id + '</td>' +
            '<td>' + item.accountName + '</td>' +
            '<td> <button class="view" id = "nextPageDetails" onclick = "transtonextPage(' + item.id + ')" value="' + item.id + '">View</button> <button class="edit" onclick="editDetails(' + item.id + ')">Edit</button > <button class="delete"  onclick="deleteDetails(' + item.id + ')">Delete</button></td >';

        str += '</tr>';
        $('tbody').append(str);
    });
}

function buildTable() {
    $('tbody').empty();
    getStaffList();
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

function getStaff(id) {
    var url = "http://localhost:8080/api/accounts/once?id=";

    url += id;

    $.ajax({
        url: url,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function(data, textStatus, xhr) {
            // error
            if (status == "error") {
                alert("Error when loading data");
                return;
            }

            // success
            $('#detail-part').empty();

            var str = "";
            str += '<div>'
            str += '<p>Name: <span>' + data.accountName + '</span></p>'
            str += '<p>Age: <span>' + data.age + '</span></p>'
            str += '<p>Role: <span>' + data.role + '</span></p>'
            str += '<p>Email: <span>' + data.email + '</span></p>'
            str += '</div>'

            $('#detail-part').append(str);
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function addStaff() {
    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    var role = document.getElementById("role").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var staff = {
        accountName: name,
        age: age,
        role: role,
        email: email,
        password: password
    }

    $.ajax({
        url: 'http://localhost:8080/api/accounts',
        type: 'POST',
        data: JSON.stringify(staff),
        dataType: 'json',
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (result) {
            // success
            console.log(staff);
            console.log('success');
            getStaffList();
            window.location.href = "manage_staff_account_list.html"
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

function updateStaff(id) {
    var name = document.getElementById("name").value
    var age = document.getElementById("age").value
    var role = document.getElementById("role").value;
    var email = document.getElementById("email").value;

    var staff = {
        id: id,
        accountName: name,
        age: age,
        role: role,
        email: email,
    }

    $.ajax({
        url: 'http://localhost:8080/api/accounts/update?id=' + id,
        type: 'PUT',
        data: JSON.stringify(staff),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (result) {
            // success
            localStorage.removeItem("staffId");
            getStaffList();
            window.location.href = "manage_staff_account_list.html"
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
    localStorage.setItem("staffId", id);
    $('body').load("manage_staff_account_edit.html");
}

function updateOk() {
    updateStaff(localStorage.getItem("staffId"));
}

function deleteStaff(id) {
    $.ajax({
        url: 'http://localhost:8080/api/accounts/delete?id=' + id,
        type: 'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (result) {
            window.location.href = "manage_staff_account_list.html"
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
        deleteStaff(id);
    } else {

    }
}