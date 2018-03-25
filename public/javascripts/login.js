function login() {
    var form = document.getElementById("login-form");
    var user = {
        email: form.email.value,
        password: form.password.value
    };

    $.ajax({
        url: '/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user),
        statusCode: {
            401: function() {
                alert("Invalid username/password");
            },
            200: function() {
                window.location = '/dashboard';
            }
        }
    });
}