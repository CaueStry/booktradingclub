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

function cancelReq(id) {
    $.ajax({
        url: '/dashboard/reqByMe',
        type: 'DELETE',
        data: {id: id},
        statusCode: {
            200: function() {
                alert("Your request has been canceled.");
                location.reload();
            },
            400: function() {
                alert("Error: unable to cancel request.");
                location.reload();
            }
        }
    });
}

function approveReq(id) {
    $.ajax({
        url: '/dashboard/reqToMe',
        type: 'DELETE',
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

function rejectReq(id) {
    $.ajax({
        url: '/dashboard/reqToMe',
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

function deleteAccountClick() {
    var click = document.getElementById("deleteAccountClick");
    var confirm = document.getElementById("deleteAccountConfirm");
    click.style.display = "none";
    confirm.style.display = "block";
  }
  
function deleteAccountConfirm() {
    $.ajax({
        url: '/dashboard/myProfile',
        type: 'DELETE',
        statusCode: {
            200: function() {
                alert("Your account has been deleted.");
                window.location = '/login';
            },
            400: function() {
                alert("Error: Couldn't delete your account.");
                location.reload();
            }
        }
    });
}