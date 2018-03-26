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
