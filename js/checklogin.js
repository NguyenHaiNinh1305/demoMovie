function directloginpage() {
    if (localStorage.getItem("accountName") == undefined && localStorage.getItem("password") == undefined) {
        window.location.href = "http://127.0.0.1:5500/index.html"
    }
}
directloginpage()