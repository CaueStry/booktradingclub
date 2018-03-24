function uploadBook() {
    var email;

    $.ajax({
        url: "/getSession",
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    }, function(data) {
        email = data.email;
    });
    console.log(email);

    var form = document.getElementById("login-form");
    var book = {
        ownerLangaraId: form.ownerlangaraid.value,
        isbn: form.isbn.value,
        title: form.title.value,
        edition: form.edition.value,
        author: form.author.value,
        copyCondition: form.condition.value,
        copyPrice: form.price.value,
        coverUrl: form.coverurl.value,
        copyDescription: form.description.value
    }

    $.ajax({
        url: "/dashboard",
        dataType: "json",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(book),
        success: function(data, textStatus, xhr) {
            console.log(`Status: ${xhr.status}`);
            if (xhr.status == 200) {
              alert("Book uploaded successfully!");
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(`Status: ${xhr.status}`);
        }
    });
}
