//https://developers.google.com/web/ilt/pwa/working-with-indexeddb
//https://blog.teamtreehouse.com/create-your-own-to-do-app-with-html5-and-indexeddb
//https://www.tutorialspoint.com/html5/html5_indexeddb.htm
//https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

var acitivitiesDB = (function() {
    var userToDoList = {};
    var secondDatastore = null;


    //connection to indexeddb open
    userToDoList.open = function(callback) {

        var version = 2;

        //secondDatastore connection
        var datastoreConnection = indexedDB.open('todos', version);

        //new version upgrade
        datastoreConnection.onupgradeneeded = function(event) {
            var db = event.target.result;

            event.target.transaction.onerror = userToDoList.onerror;

            // Delete the old secondDatastore.
            if (db.objectStoreNames.contains('userTodo')) {
                db.deleteObjectStore('userTodo');
            }

            var store = db.createObjectStore('userTodo', {
                keyPath: 'text'
            });
        };

        // Handle successful secondDatastore access.
        datastoreConnection.onsuccess = function(event) {
            // Get a reference to the DB.
            secondDatastore = event.target.result;

            // Execute the callback.
            callback();
        };

        // Handle errors when opening the secondDatastore.
        datastoreConnection.onerror = userToDoList.onerror;
    };


    userToDoList.getuserToDoList = function(callback) {
        var db = secondDatastore;
        var transaction = db.transaction(['userTodo'], 'readwrite');
        var objStore = transaction.objectStore('userTodo');
        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = objStore.openCursor(keyRange);
        var todoList = [];

        transaction.oncomplete = function(e) {
            // Execute the callback function.
            callback(todoList);
        };
        cursorRequest.onsuccess = function(e) {
            var result = e.target.result;

            if (!!result == false) {
                return;
            }
            todoList.push(result.value);
            result.continue();
        };
        cursorRequest.onerror = userToDoList.onerror;
    };

    userToDoList.addToDo = function(text, date, callback) {

        //getting the database
        var db = secondDatastore;

        // database transaction
        var transaction = db.transaction(['userTodo'], 'readwrite');

        var objectStore = transaction.objectStore('userTodo');

        //creating a booking object
        var booking = {
            'text': text,
            'date': date

        };

        //secondDatastore request
        var request = objectStore.put(booking);

        //successful secondDatastore put
        request.onsuccess = function(e) {
            callback(booking);
        };

        //error handling
        request.onerror = userToDoList.onerror;
    };

    //exporting bookingCollections
    return userToDoList;
}());



