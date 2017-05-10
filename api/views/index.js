function login() {
    var userData = {
        name: document.getElementById('username'),
        password: document.getElementById('password')
    };

    $.ajax({
        url: "http://localhost:3000/login",
        type: "POST",
        dataType: "json",
        data: userData,
        error: function (xhr, status) {
            console.log("Sorry, there was a problem!");
        },
        complete: function (xhr, status) {
            console.log(xhr);
        }
    });
}

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});