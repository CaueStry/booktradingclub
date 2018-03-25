function submitLogin() {
    var form = document.getElementById("login-form");
    var user = {
        email: form.email.value,
        password: form.password.value
    }

    $.ajax({
        url: "/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function(data, textStatus, xhr) {
            window.location = data.redirect;
        },
        error: function(xhr, textStatus, errorThrown) {
            alert("Invalid Credentials");
        }
    });
}