function trade(id) {
    $.ajax({
        url: '/dashboard',
        type: 'PUT',
        data: {id: id},
        statusCode: {
            200: function() {
                alert("Your request has been posted.");
                location.reload();
            },
            400: function() {
                alert("Error: The book is not available.");
                location.reload();
            }
        }
    });
}
function deleteBook(id) {
    $.ajax({
        url: '/dashboard/mybooks',
        type: 'DELETE',
        data: {id: id},
        statusCode: {
            200: function() {
                alert("Your book has been deleted.");
                location.reload();
            },
            400: function() {
                alert("Error: unable to delete.");
                location.reload();
            }
        }
    });
}

function uploadBook() {
  var form = document.getElementById("login-form");
  var book = {
      isbn: form.isbn.value,
      title: form.title.value,
      edition: form.edition.value,
      author: form.author.value,
      copyCondition: form.condition.value,
      copyPrice: form.price.value,
      coverUrl: form.coverurl.value,
      copyDescription: form.description.value
    };
    $.ajax({
        url: '/dashboard/uploadBook',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(book),
        statusCode: {
            200: function() {
                alert("Your book has been uploaded.");
                window.location = '/dashboard/mybooks';
            },
            400: function() {
                alert("Error: unable to upload.");
                location.reload();
            }
        }
    });
}
