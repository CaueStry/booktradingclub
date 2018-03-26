function trade(id) {
    $.ajax({
        url: '/dashboard',
        type: 'PUT',
        data: {id: id},
        success: function(data) {
            alert("Book was successfully requested.");
        }
    });
}
