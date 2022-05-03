

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
                $("span.check").html("<i class='fa-solid fa-circle-exclamation'></i> INVALID LOGIN, PLEASE TRY AGAIN");
            }
        });

    });


});

$('#logout').click(function () {
    if (window.confirm('Are you sure you want to log out?')) {
        localStorage.clear()
        window.location.replace("index.html")
    } else {
        return
    }
})

function loadProfile() {
    let name = localStorage.getItem('accountName');
    let age = localStorage.getItem('age');
    let role = localStorage.getItem('role');
    let email = localStorage.getItem('email');

    var str = "";

    str += '<div>';
    str += '<p>Name: <span>' + name + '</span></p>';
    str += '<p>Age: <span>' + age + '</span></p>';
    str += '<p>Role: <span>' + role + '</span></p>';
    str += '<p>Email: <span>' + email + '</span></p>';
    str += '</div>';

    $("#profile-part").append(str);
}
loadProfile();

function yourProfile() {
    window.location.href = "http://127.0.0.1:5500/your_profile.html";
}

var adminBtn = document.querySelector('#return-to-admin');

function disableBtn() {
    const role = localStorage.getItem('role');
    if (role == 'staff') {
        adminBtn.disabled = true;
    } else {
        window.location.href = "http://127.0.0.1:5500/admin_homepage.html";
    }
}
function disable() {
    const role = localStorage.getItem('role');
    if (role == 'staff') {
        $("#return-to-admin").css("display", "none");
    }
}
disable()

function returnHomepage() {
    const role = localStorage.getItem('role');
    if (role == 'staff') {
        $('body').load("staff_homepage.html");
    } else {
        window.location.href = "http://127.0.0.1:5500/admin_homepage.html";
    }
}