function submitRegistration() {
    var form = document.getElementById("login-form");
    var user = {
        email: form.email.value,
        firstName: form.firstname.value,
        lastName: form.lastname.value,
        langaraid: form.langaraid.value,
        address: form.address.value,
        password: form.password.value,
        type: form.type.value
    }

    $.ajax({
        url: "/register",
        dataType: "json",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function(data, textStatus, xhr) {
            console.log(`Status: ${xhr.status}`);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(`Status: ${xhr.status}`);
        }
    });
}