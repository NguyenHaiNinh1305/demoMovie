var SIZE = 4;
var currentPage = 1;
var isAsc = true;
var currentFieldName = "id";
var movies = [];

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
            if (jqXHR.status == 403) {
                window.location.replace("forbidden.html");
            }
        }
    });
}

function fillMovieToTable() {
    movies.forEach(function (item, index) {
        var str = "";
        str += '<tr>';

        str +=
            '<td>' + item.id + '</td>' +
            '<td style="width: 600px;">' + item.name + '</td>' +
            '<td> <button class="view" id = "nextPageDetails" onclick = "transtonextPage(' + item.id + ')" value="' + item.id + '">View</button> <button class="edit" onclick="editdetails(' + item.id + ')">Edit</button > <button class="delete"  onclick="deleteDetails(' + item.id + ')">Delete</button></td >';

        str += '</tr>';
        $('tbody').append(str);
    })
}

function buildTable() {
    $('tbody').empty();
    getListMovies();
}

function clickViewListMovie() {

    // $(document).ready(function () {
    //     window.location.replace("admin_manage_movie_list.html");
    // });
    window.location.href = "http://127.0.0.1:5500/admin_manage_movie_list.html"


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

function getMovie(id) {
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
            // reset list employees

            // error
            if (status == "error") {
                // TODO
                alert("Error when loading data");
                return;
            }

            // success
            $('#wrapper-content').empty();

            var str = "";

            str += '<div id="img-part"> <img src="' + data.poster + '" alt="Neon genesis"></div>'
            str += '<div id="detail-movie">'
            str += '<p id="name-movie">' + data.name + '</p>'
            str += '<p>Director: <span id="director">' + data.director + '</span></p>'
            str += '<p>Cast: <span id="cast">' + data.cast + '</span></p>'
            str += '<p>Genre: <span id="genre">' + data.genre + '</span></p>'
            str += '<p>Running time: <span id="time">155 minutes</span></p>'
            str += '<p>Language: <span id="langue">' + data.language + '</span></p>'
            str += '<p>Rated: <span id="rate">' + data.rate + '</span></p>'
            str += '<p>Duration: <span id="duration">' + data.durationStart + " - " + data.durationEnd + '</span></p>'
            str += '</div>'

            $('#wrapper-content').append(str);
            //transtonextPage(id)
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.replace("forbidden.html");
            }
        }
    });
}

function transtonextPage(id) {
    $('body').load("admin-manage-movie-detail.html")
    getMovie(id);
}

function addMovie() {
    var title = document.getElementById("title").value
    var director = document.getElementById("director").value
    var cast = document.getElementById("Cast").value;
    var genre = document.getElementById("genre").value;
    var language = document.getElementById("language").value;
    var rate = document.getElementById("rate").value;
    var starttime = document.getElementById("start-time").value + ":00";
    var endtime = document.getElementById("end-time").value + ":00";
    var poster = document.getElementById("imageposter").value;
    var releaseDate = document.getElementById("running-time").value
    if (title == "" && director == "" && cast == "" && genre == "" && language == "" && rate == "" && starttime == ":00" && endtime == ":00" && poster == "" && releaseDate == "") {
        alert("Please type content")
        return
    } else {
        if (title == "") {
            alert("Please type title")
            return
        }
        if (releaseDate == "") {
            alert("Please choose releaseDate")
            return
        }
        if (director == "") {
            alert("Please type director")
            return
        }
        if (cast == "") {
            alert("Please type cast")
            return
        }
        if (genre == "") {
            alert("Please type genre")
            return
        }
        if (language == "") {
            alert("Please type language")
            return
        }
        if (rate == "") {
            alert("Please type rate")
            return
        }
        if (starttime == "") {
            alert("Please choose starttime")
            return
        }
        if (endtime == "") {
            alert("Please choose endtime")
            return
        }
        if (poster == "") {
            alert("Please type poster")
            return
        }
    }


    var movie = {
        name: title,
        director: director,
        cast: cast,
        genre: genre,
        language: language,
        rate: rate,
        durationStart: starttime,
        durationEnd: endtime,
        poster: poster,
        releaseDate: releaseDate
    }

    $.ajax({
        url: 'http://localhost:8080/v1/movie/add',
        type: 'POST',
        data: JSON.stringify(movie),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (result) {
            // success
            console.log(movie);
            console.log('success');
            getListMovies()
            window.location.href = "admin_manage_movie_list.html"
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.replace("forbidden.html");
            }
        }
    });
}
// Resolved [org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: Cannot deserialize value of type `java.util.Date` from String "2022-05-2": not a valid representation (error: Failed to parse Date value '2022-05-2': Cannot parse date "2022-05-2": while it seems to fit format 'yyyy-MM-dd', parsing fails (leniency? null)); nested exception is com.fasterxml.jackson.databind.exc.InvalidFormatException: Cannot deserialize value of type `java.util.Date` from String "2022-05-2": not a valid representation (error: Failed to parse Date value '2022-05-2': Cannot parse date "2022-05-2": while it seems to fit format 'yyyy-MM-dd', parsing fails (leniency? null))<LF> at [Source: (PushbackInputStream); line: 1, column: 273] (through reference chain: com.group.form.CreateUpdateMovieForm["releaseDate"])]

function updateMovie(id) {
    var title = document.getElementById("title").value
    var director = document.getElementById("director").value
    var cast = document.getElementById("Cast").value;
    var genre = document.getElementById("genre").value;
    var language = document.getElementById("language").value;
    var rate = document.getElementById("rate").value;
    var starttime = document.getElementById("start-time").value + ":00";
    var endtime = document.getElementById("end-time").value + ":00";
    var poster = document.getElementById("imageposter").value;
    var releaseDate = document.getElementById("running-time").value
    if (title == "" && director == "" && cast == "" && genre == "" && language == "" && rate == "" && starttime == ":00" && endtime == ":00" && poster == "" && releaseDate == "") {
        alert("Please type content")
        return
    } else {
        if (title == "") {
            alert("Please type title")
            return
        }
        if (releaseDate == "") {
            alert("Please choose releaseDate")
            return
        }
        if (director == "") {
            alert("Please type director")
            return
        }
        if (cast == "") {
            alert("Please type cast")
            return
        }
        if (genre == "") {
            alert("Please type genre")
            return
        }
        if (language == "") {
            alert("Please type language")
            return
        }
        if (rate == "") {
            alert("Please type rate")
            return
        }
        if (starttime == "") {
            alert("Please choose starttime")
            return
        }
        if (endtime == "") {
            alert("Please choose endtime")
            return
        }
        if (poster == "") {
            alert("Please type poster")
            return
        }
    }
    var movie = {
        id: id,
        name: title,
        director: director,
        cast: cast,
        genre: genre,
        language: language,
        rate: rate,
        durationStart: starttime,
        durationEnd: endtime,
        poster: poster,
        releaseDate: releaseDate
    }

    $.ajax({
        url: 'http://localhost:8080/v1/movie/' + id,
        type: 'PUT',
        data: JSON.stringify(movie),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (result) {
            // success

            localStorage.removeItem("movieId")
            getListMovies()

            window.location.href = "admin_manage_movie_list.html"
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.replace("forbidden.html");
            }
        }
    });

}

function editdetails(id) {
    localStorage.setItem("movieId", id)
    $('body').load("admin-manage-movie-edit.html")

}

function updateOk() {
    updateMovie(localStorage.getItem("movieId"))
}

function deleteDetails(id) {
    let text = "Do you really want to delete this field?\nEither OK or Cancel.";
    if (confirm(text) == true) {
        deleteMovie(id)
    } else {

    }
    // 
}

function deleteMovie(id) {
    $.ajax({
        url: 'http://localhost:8080/v1/movie/' + id,
        type: 'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(
                localStorage.getItem("accountName") + ":" + localStorage.getItem("password")));
        },
        success: function (result) {
            // success

            window.location.href = "admin_manage_movie_list.html"

        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.replace("forbidden.html");
            }
        }
    });

}