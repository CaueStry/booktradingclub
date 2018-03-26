var books;

function rtrvFeaturedBooks(numBooks) {
    $.ajax({
        url: '/dashboard',
        type: 'GET',
        data: numBooks,
        dataType: 'json',
        success: function(data) {
            books = data.books;
        }
    });
}

rtrvFeaturedBooks(12);