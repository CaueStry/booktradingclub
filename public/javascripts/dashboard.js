var books = [];

function rtrvFeaturedBooks(numBooks) {
    $.ajax({
        url: '/dashboard',
        type: 'GET',
        data: numBooks,
        statusCode: {
            200: function(data) {
                
            }
        }
    });
}