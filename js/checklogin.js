function directloginpage() {
    if (localStorage.getItem("accountName") == undefined && localStorage.getItem("password") == undefined) {
        window.location.replace("index.html")
    }
}
directloginpage()