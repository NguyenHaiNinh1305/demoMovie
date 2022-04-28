var SIZE = 12;
var currentPage = 1;
var isAsc = true;
var currentFieldName = "id";
var movies = [];

//getlist movie
function getListMovies() {
    // call API from server
    var url = "http://localhost:8080/v1/movie/list";

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
            // reset list employees
            movies = [];

            // error
            if (status == "error") {
                // TODO
                alert("Error when loading data");
                return;
            }

            // success
            movies = data.content;
            //transtonextPage(id);
            fillMovieToTable();
            renderPaging(data.totalPages);

        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function fillMovieToTable() {
    movies.forEach(function (item, index) {
        var str = "";
        str += ' <div class="card" onclick= "clickSeeDetails(' + item.id + "," + "'" + item.name + "'" + ')">';

        str +=
            '<img class="poster" src="' + item.poster + '" />' +
            '<p class="film-title">' + item.name + '</p>'

        str += '</div>';
        $('#container').append(str);





    })


}


function buildTable() {
    $('#container').empty();
    getListMovies();
}


function clickViewMovieForStaff() {

    // $(document).ready(function () {
    //     window.location.replace("admin_manage_movie_list.html");
    // });
    window.location.href = "http://127.0.0.1:5500/staff_create_order_choose_film.html"


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


//choosefilm
function clickSeeDetails(id, name) {
    $('body').load("choose_film_detail.html")
    localStorage.setItem("movieId", id)
    localStorage.setItem("movieName", name)
    getMoviess(id);
}
function getMoviess(id) {
    // call API from server

    var url = "http://localhost:8080/v1/movie" + "/";

    url += id;


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
            $('.detail-part').empty();

            var str = "";


            str += '<div class="img-part"> <img src="' + data.poster + '" alt="" id="img-film"> </div>'
            str += '<div class="info-film">'
            str += '<p class="name-movie">' + data.name + '</p>'
            str += '<p class="text-style font-w-600">Director: <span class="text-style font-w-400">' + data.director + '</span></p>'
            str += '<p class="text-style font-w-600">Cast: <span class="text-style font-w-400">' + data.cast + '</span></p>'
            str += ' <p class="text-style font-w-600">Genre: <span class="text-style font-w-400">' + data.genre + '</span></p>'
            str += '<p class="text-style font-w-600">Release date: <span class="text-style font-w-400">' + data.releaseDate + '</span></p>'
            str += '<p class="text-style font-w-600">Running time: <span class="text-style font-w-400">155 minutes</span> </p>'
            str += '<p class="text-style font-w-600">Language: <span class="text-style font-w-400">' + data.language + '</span></p>'
            str += '<p class="text-style font-w-600">Rated: <span class="text-style font-w-400">' + data.rate + '</span></p>'
            str += '</div> '

            $('.detail-part').append(str);


        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}


function chooseday() {
    localStorage.setItem("datechoosed", 1000)
}
function choosetimefor2d() {
    localStorage.setItem("price2d", 70000)
}

function choosetimefor3d() {
    localStorage.setItem("price3d", 100000)
}
function nextToStep() {
    if (localStorage.getItem("datechoosed") == undefined) {
        alert('Please choose date')
        localStorage.removeItem("datechoosed")
        localStorage.removeItem("price2d")
        localStorage.removeItem("price3d")
        return
    }
    else if (localStorage.getItem("price2d") == undefined && localStorage.getItem("price3d") == undefined) {
        alert("Please choose time for type ticket")
        localStorage.removeItem("datechoosed")
        localStorage.removeItem("price2d")
        localStorage.removeItem("price3d")
    } else {
        if (localStorage.getItem("price2d") != undefined) {
            window.location.replace("staff_create_order_choose_seat.html")
            let price = localStorage.getItem("price2d")
            localStorage.removeItem("datechoosed")
            localStorage.removeItem("price3d")
            return price
        } else {
            window.location.replace("staff_create_order_choose_seat.html")
            localStorage.getItem("price3d")
            let price = localStorage.getItem("price3d")
            localStorage.removeItem("datechoosed")
            localStorage.removeItem("price2d")
            return price
        }
    }
}



var seats = []

function getListSeats() {
    // call API from server
    var url = "http://localhost:8080/seats";

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
            seats = [];

            seats = data;
            //transtonextPage(id);

            if (localStorage.getItem("movieId") == 1) {
                fillSeatToTable();
            } else if (localStorage.getItem("movieId") == 2) {
                fillSeatToTable1();
            } else if (localStorage.getItem("movieId") == 3) {
                fillSeatToTable2();
            } else if (localStorage.getItem("movieId") == 4) {
                fillSeatToTable3();
            } else if (localStorage.getItem("movieId") == 5) {
                fillSeatToTable4();
            }



        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function fillSeatToTable() {
    var str = "";
    str += '<div class="row">';
    for (var i = 1; i <= 10; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="A' + i + '" style="background-color:#810101;color: white;">A' + i + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="A' + i + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">A' + i + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 11; i <= 20; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="B' + (i - 10) + '" style="background-color:#810101;color: white;">B' + (i - 10) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="B' + (i - 10) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">B' + (i - 10) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 21; i <= 30; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="C' + (i - 20) + '" style="background-color:#810101;color: white;">C' + (i - 20) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="C' + (i - 20) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">C' + (i - 20) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 31; i <= 40; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="D' + (i - 30) + '" style="background-color:#810101;color: white;">D' + (i - 30) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="D' + (i - 30) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">D' + (i - 30) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 41; i <= 50; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="E' + (i - 40) + '" style="background-color:#810101;color: white;">E' + (i - 40) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="E' + (i - 40) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">E' + (i - 40) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 51; i <= 60; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="F' + (i - 50) + '" style="background-color:#810101;color: white;">F' + (i - 50) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="F' + (i - 50) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">F' + (i - 50) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 61; i <= 70; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="G' + (i - 60) + '" style="background-color:#810101;color: white;">G' + (i - 60) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="G' + (i - 60) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">G' + (i - 60) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 71; i <= 80; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="H' + (i - 70) + '" style="background-color:#810101;color: white;">H' + (i - 70) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="H' + (i - 70) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">H' + (i - 70) + '</button>'
    }
    str += '</div>';
    $('#seat-list').append(str);




}

function fillSeatToTable2() {
    var str = "";
    str += '<div class="row">';
    for (var i = 161; i <= 170; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="A' + (i - 160) + '" style="background-color:#810101;color: white;">A' + (i - 160) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="A' + (i - 160) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">A' + (i - 160) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 171; i <= 180; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="B' + (i - 170) + '" style="background-color:#810101;color: white;">B' + (i - 170) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="B' + (i - 170) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">B' + (i - 170) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 181; i <= 190; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="C' + (i - 180) + '" style="background-color:#810101;color: white;">C' + (i - 180) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="C' + (i - 180) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">C' + (i - 180) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 191; i <= 200; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="D' + (i - 190) + '" style="background-color:#810101;color: white;">D' + (i - 190) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="D' + (i - 190) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">D' + (i - 190) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 201; i <= 210; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="E' + (i - 200) + '" style="background-color:#810101;color: white;">E' + (i - 200) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="E' + (i - 200) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">E' + (i - 200) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 211; i <= 220; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="F' + (i - 210) + '" style="background-color:#810101;color: white;">F' + (i - 210) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="F' + (i - 210) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">F' + (i - 210) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 221; i <= 230; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="G' + (i - 220) + '" style="background-color:#810101;color: white;">G' + (i - 220) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="G' + (i - 220) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">G' + (i - 220) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 231; i <= 240; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="H' + (i - 230) + '" style="background-color:#810101;color: white;">H' + (i - 230) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="H' + (i - 230) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">H' + (i - 230) + '</button>'
    }
    str += '</div>';
    $('#seat-list').append(str);




}

function fillSeatToTable1() {
    var str = "";
    str += '<div class="row">';
    for (var i = 81; i <= 90; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="A' + (i - 80) + '" style="background-color:#810101;color: white;">A' + (i - 80) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="A' + (i - 80) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">A' + (i - 80) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 91; i <= 100; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="B' + (i - 90) + '" style="background-color:#810101;color: white;">B' + (i - 90) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="B' + (i - 90) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">B' + (i - 90) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 101; i <= 110; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="C' + (i - 100) + '" style="background-color:#810101;color: white;">C' + (i - 100) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="C' + (i - 100) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">C' + (i - 100) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 111; i <= 120; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="D' + (i - 110) + '" style="background-color:#810101;color: white;">D' + (i - 110) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="D' + (i - 110) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">D' + (i - 110) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 121; i <= 130; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="E' + (i - 120) + '" style="background-color:#810101;color: white;">E' + (i - 120) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="E' + (i - 120) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">E' + (i - 120) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 131; i <= 140; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="F' + (i - 130) + '" style="background-color:#810101;color: white;">F' + (i - 130) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="F' + (i - 130) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">F' + (i - 130) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 141; i <= 150; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="G' + (i - 140) + '" style="background-color:#810101;color: white;">G' + (i - 140) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="G' + (i - 140) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">G' + (i - 140) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 151; i <= 160; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="H' + (i - 150) + '" style="background-color:#810101;color: white;">H' + (i - 150) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="H' + (i - 150) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">H' + (i - 150) + '</button>'
    }
    str += '</div>';
    $('#seat-list').append(str);




}

function fillSeatToTable3() {
    var str = "";
    str += '<div class="row">';
    for (var i = 241; i <= 250; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="A' + (i - 240) + '" style="background-color:#810101;color: white;">A' + (i - 240) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="A' + (i - 240) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">A' + (i - 240) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 251; i <= 260; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="B' + (i - 250) + '" style="background-color:#810101;color: white;">B' + (i - 250) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="B' + (i - 250) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">B' + (i - 250) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 261; i <= 270; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="C' + (i - 260) + '" style="background-color:#810101;color: white;">C' + (i - 260) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="C' + (i - 260) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">C' + (i - 260) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 271; i <= 280; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="D' + (i - 270) + '" style="background-color:#810101;color: white;">D' + (i - 270) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="D' + (i - 270) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">D' + (i - 270) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 281; i <= 290; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="E' + (i - 280) + '" style="background-color:#810101;color: white;">E' + (i - 280) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="E' + (i - 280) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">E' + (i - 280) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 291; i <= 300; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="F' + (i - 290) + '" style="background-color:#810101;color: white;">F' + (i - 290) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="F' + (i - 290) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">F' + (i - 290) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 301; i <= 310; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="G' + (i - 300) + '" style="background-color:#810101;color: white;">G' + (i - 300) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="G' + (i - 300) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">G' + (i - 300) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 311; i <= 320; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="H' + (i - 310) + '" style="background-color:#810101;color: white;">H' + (i - 310) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="H' + (i - 310) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">H' + (i - 310) + '</button>'
    }
    str += '</div>';
    $('#seat-list').append(str);




}

function fillSeatToTable4() {
    var str = "";
    str += '<div class="row">';
    for (var i = 321; i <= 330; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="A' + (i - 320) + '" style="background-color:#810101;color: white;">A' + (i - 320) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="A' + (i - 320) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">A' + (i - 320) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 331; i <= 340; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="B' + (i - 330) + '" style="background-color:#810101;color: white;">B' + (i - 330) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="B' + (i - 330) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">B' + (i - 330) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 341; i <= 350; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="C' + (i - 340) + '" style="background-color:#810101;color: white;">C' + (i - 340) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="C' + (i - 340) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">C' + (i - 340) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 351; i <= 360; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="D' + (i - 350) + '" style="background-color:#810101;color: white;">D' + (i - 350) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="D' + (i - 350) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">D' + (i - 350) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 361; i <= 370; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="E' + (i - 360) + '" style="background-color:#810101;color: white;">E' + (i - 360) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="E' + (i - 360) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">E' + (i - 360) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 371; i <= 380; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="F' + (i - 370) + '" style="background-color:#810101;color: white;">F' + (i - 370) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="F' + (i - 370) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">F' + (i - 370) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 381; i <= 390; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="G' + (i - 380) + '" style="background-color:#810101;color: white;">G' + (i - 380) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="G' + (i - 380) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">G' + (i - 380) + '</button>'
    }
    str += '</div>';
    str += '<div class="row">';
    for (var i = 391; i <= 400; i++) {
        if (seats[i].status === 'occupied') {
            str +=
                '<button class="seat" value="H' + (i - 390) + '" style="background-color:#810101;color: white;">H' + (i - 390) + '</button>'
            continue;
        }
        str +=
            '<button class="seat" value="H' + (i - 390) + '" onclick="chooseSeat(' + seats[i].id + ')" id = "selectseat' + seats[i].id + '">H' + (i - 390) + '</button>'
    }
    str += '</div>';
    $('#seat-list').append(str);




}




function buildSeatTable() {
    $('#seat-list').empty();
    getListSeats();
}

buildSeatTable();



// choose seat
var listseat = []
var index = 1
function chooseSeat(id) {
    if (index === 1) {
        str = ''
        str = "#selectseat"
        str += id + ''
        $(str).css("background-color", "#C21409");
        $(str).css("color", "white")

        if (!listseat.includes(id)) {
            listseat.push(id)
        }
        localStorage.setItem("listseatId", listseat)
        index++
        return
    }
    var listid = localStorage.getItem("listseatId").split(',')

    if (index === 2) {

        if (listid.includes(id + '')) {
            str = ''
            str = "#selectseat"
            str += id + ''
            $(str).css("background-color", "white");
            $(str).css("color", "black")
            listid.splice(listid.indexOf(id), 1)
            localStorage.setItem("listseatId", listid)
            //index = 1
        } else {
            str = ''
            str = "#selectseat"
            str += id + ''
            $(str).css("background-color", "#C21409");
            $(str).css("color", "white")
            if (!listseat.includes(id)) {
                listseat.push(id)
            }
            localStorage.setItem("listseatId", listseat)
            //index = 1
        }
    }
}



var snacks = [];


function getListSnacks() {
    var url = "http://localhost:8080/snacks";

    $.ajax({
        url: url,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (data, textStatus, xhr) {

            snacks = [];

            snacks = data.content;

            fillSnackToTable()
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
        str += '<div class="card">'
        str += '<img class="poster" id = "select_poster" src="' + item.picture + '" />'
        str += '<p class="snack-name">' + item.snackname + '</p>'
        str += '<button class="select-snack" value="popcorn" id= "select_food" onclick= "selectSnack(' + "'" + item.picture + "'," + "'" + item.snackname + "'" + ',' + item.snackprice + ',' + item.id + ')">Select</button>'
        str += '</div>'
        if (item.snacktype === 'popcorn') {
            $('#popcorn').append(str);
        } else {
            $('#drink').append(str);
        }
    })
}


function buildSnackTable() {
    $('#popcorn').empty();
    $('#drink').empty();
    getListSnacks();
}

buildSnackTable();






var selectedfoo = []
var selectedidfood = []
index = 1
function selectSnack(picture, snackname, price, id) {

    var str = "";
    //str += '<p class="guide">Selected</p>'
    str += '<div class="snack-detail" id= "seletedFoodt' + id + '">'
    str += '<img class="poster-mini" src="' + picture + '" />'
    str += '<div class="detail-info">'
    str += '<p class="snack-name" id= "seletedFoodname' + id + '" >' + snackname + '</p>'
    str += '<p class="snack-unit-price" id= "seletedFoodprice' + id + '" >' + price + '</p>'
    str += '<div class="quantity"><button class="btn-quantity" value="minus" onclick= "clicktominus(' + id + ')"><i class="fa-solid fa-circle-minus"></i></button>'
    str += '<p class="number" id="clickplus' + id + '">' + 1 + ' </p>'
    str += '<button class="btn-quantity" value="plus" onclick= "clicktoplus(' + id + ')"><i class="fa-solid fa-circle-plus" ></i></button></div></div>'
    str += '<button class="btn-delete" value="popcorn" onclick= "removeSelectfood(' + id + ')"><i class="fa-regular fa-trash-can"></i></button>'
    str += '</div>'
    if (selectedfoo.length === 0) {
        selectedfoo.push(str)
        $("#snack-selected-container").empty()
        $("#snack-selected-container").append(str)
        selectedidfood.push(id)
        localStorage.setItem("selectedidfood", selectedidfood)
        return
    } else {
        if (selectedfoo.includes(str)) {
            alert('please choose another or quantities!')
            return
        } else {
            selectedidfood.push(id)
            localStorage.setItem("selectedidfood", selectedidfood)
            selectedfoo.push(str)
            $("#snack-selected-container").empty()
            selectedfoo.forEach(function (item) {
                $("#snack-selected-container").append(item)
                var strId = '#clickplus'
                strId += id + ''
                $(strId).empty()
                $(strId).prepend(index);
            })
        }
    }
}

function clicktoplus(id) {
    var strId = 'clickplus'
    strId += id + ''
    var number = document.getElementById(strId).innerHTML
    number++
    document.getElementById(strId).innerHTML = number

}

function clicktominus(id) {


    var strId = 'clickplus'
    strId += id + ''
    var number = document.getElementById(strId).innerHTML
    if (number >= 2) {
        number--
    }

    document.getElementById(strId).innerHTML = number

}

function removeSelectfood(id, index) {
    var strId = '#seletedFoodt'
    strId += id + ''
    $(strId).remove();
    selectedfoo.splice(index, 1)
    var selectfooddeleted = localStorage.getItem("selectedidfood").split(',')
    selectfooddeleted.splice(selectedidfood.indexOf(id), 1)
    localStorage.setItem("selectedidfood", selectfooddeleted)
    if (selectedfoo.length === 0) {
        var container = document.getElementById("snack-selected-container");
        var content = '<p>Please choose food to make the movie more interesting</p> <img class="beforeselect" src="../images/PinClipart.com_hardworking-clipart_5365585.png"></img>'
        container.innerHTML = content;
    }

}
