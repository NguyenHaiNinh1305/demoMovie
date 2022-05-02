$(document).ready(function () {
    $('#form_login').on("submit", function (e) {
        e.preventDefault();
        var username = document.getElementById('staff-id').value;
        var password = document.getElementById('staff-password').value;

        $.ajax({

            url: 'http://localhost:8080/login',
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
            },
            success: function (data, textStatus, xhr) {
                localStorage.setItem("id", data.id);
                localStorage.setItem("email", data.email);
                localStorage.setItem("age", data.age)
                localStorage.setItem("role", data.role);
                localStorage.setItem("accountName", username);
                localStorage.setItem("password", password);
                if (data.role === 'admin') {
                    window.location.replace("admin_homepage.html");
                }
                else {
                    window.location.replace("staff_homepage.html");
                }

            },

            error: function () {
                $("span.check").html("<i class='fa-solid fa-circle-exclamation'></i> INVALID LOGIN, PLEASE TRY AGIAN");
            }
        });

    });


});

$('#logout').click(function () {
    localStorage.clear()
    window.location.replace("index.html")
})

function loadProfile() {
    let name = localStorage.getItem('accountName');
    let age = localStorage.getItem('age');
    let role = localStorage.getItem('role');
    let email = localStorage.getItem('email');

    console.log(name);
    console.log(age);
    console.log(role);
    console.log(email);

    var str = "";

    str += '<p>Name: <span>' + name + '</span></p>';
    str += '<p>Age: <span>' + age + '</span></p>';
    str += '<p>Role: <span>' + role + '</span></p>';
    str += '<p>Email: <span>' + email + '</span></p>';

    console.log(str);

    $("#profile-part").append(str);
}

function yourProfile() {
    $('body').load("your_profile.html");
    loadProfile();
}

var adminBtn = document.querySelector('#return-to-admin');
const role = localStorage.getItem('role');
if (role == 'staff') {
    adminBtn.disabled = true;
}

function disableBtn() {
    $('body').load("admin_homepage.html");
}

function returnHomepage() {
    if (role == 'staff') {
        $('body').load("staff_homepage.html");
    } else {
        $('body').load("admin_homepage.html");
    }
}