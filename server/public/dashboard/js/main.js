function uploadBook() {
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
        description: form.description.value
    }

    $.ajax({
        url: "/dashboard",
        dataType: "json",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(book),
        success: function(data, textStatus, xhr) {
            console.log(`Status: ${xhr.status}`);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(`Status: ${xhr.status}`);
        }
    });
}
