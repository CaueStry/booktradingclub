function register() {
    var form = document.getElementById('login-form');
    var user = {
        email: form.email.value,
        firstName: form.firstname.value,
        lastName: form.lastname.value,
        langaraID: form.langaraid.value,
        password: form.password.value,
        type: form.type.value,
        major: form.major.value,
        position: form.position.value
    };

    $.ajax({
        url: '/register',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user),
        statusCode: {
            401: function() {
                alert("Invalid Fields");
            }, 
            200: function() {
                window.localtion = '/dashboard';
            }
        }
    });
}

function showMajor() {
    var major = document.getElementById("major");
    var pos = document.getElementById("position");
    major.style.display = "block";
    pos.style.display = "none";
  }
  
  function showPosition() {
    var major = document.getElementById("major");
    var pos = document.getElementById("position");
    pos.style.display = "block";
    major.style.display = "none";
  }