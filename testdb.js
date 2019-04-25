window.onload = function() {

    //each time the event page window is loaded the up to date my bookings is called

    acitivitiesDB.open(updateUserList);


    cleanUp.onclick = function() {
        var text = "Kelvingrove Clean up";
        var date = "stand.html";
        {

            acitivitiesDB.addToDo(text, date, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };

    skatePark.onclick = function() {
        var text = "Kelsdfsafd Clean up";
        var date = "bvmnvnb.html";
        {

            acitivitiesDB.addToDo(text, date, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };

    dsfsdf.onclick = function() {
        var text = "Kelsdafsadfve Clean up";
        var date = "vcnbnvbcn.html";
        {

            acitivitiesDB.addToDo(text, date, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };

}

//called when each booking is created to update the booking list on the events page
function updateUserList() {

    //fetches the bookings
    acitivitiesDB.getuserToDoList(function(userTodos) {

        //appends it to table
        var userList = document.getElementById('todo_table');
        userList.innerHTML = '';

        //for every booking in the database
        for(var i = 0; i < userTodos.length; i++) {


            var booking = userTodos[(userTodos.length - 1 - i)];

            //creates the list
            var li2 = document.createElement('li');

            var span2 = document.createElement('a');

            span2.href = booking.date;

            span2.innerText = "view page";


            li2.appendChild(span2);

            userList.appendChild(li2);

        }

    });
}
