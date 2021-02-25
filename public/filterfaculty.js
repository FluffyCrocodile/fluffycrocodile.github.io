function filterFacultyByID() {
    //get the id of the selected homeworld from the filter dropdown
    var homeworld_id = document.getElementById('homeworld_filter').value
    console.log(homeworld_id);
    //construct the URL and redirect to it
    window.location = '/faculty/filter/' + parseInt(homeworld_id)
}