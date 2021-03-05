function updatePerson(id){
    $.ajax({
        url: '/students/' + id,
        type: 'PUT',
        data: $('#update-person').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};