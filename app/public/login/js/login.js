function submitLogin() {
    var form = document.getElementById("login-form");
    var user = {
        email: form.email.value,
        password: form.password.value
    }

    $.ajax({
        url: "/login",
        dataType: "json",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        error: function(xhr, textStatus, errorThrown) {
            console.log(`Error: Status ${xhr.status}`);
        }
    });
}