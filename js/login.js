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

$('#btn-prof').click(function () {
    localStorage.clear()
    window.location.replace("index.html")

})