

var config = {
    apiKey: "AIzaSyCEEa8pZ8c4eQvEz25C4THnF-8d7luU_Fo",
    authDomain: "week-7-hw-83f53.firebaseapp.com",
    databaseURL: "https://week-7-hw-83f53.firebaseio.com",
    projectId: "week-7-hw-83f53",
    storageBucket: "",
    messagingSenderId: "362371958425"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var firstTime = "";
var frequency = "";
var arrival = "";
var minutes = "";





// Capture Button Click
$("#add-train").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();



    var newName = $("#train-input").val().trim();
    var newdest = $("#destination-input").val().trim();
    var firstTime = $("#time-input").val().trim();
    var newfreq = $("#frequency-input").val().trim();

    // substract 1 to make sure time comes before current time
    var firstTime = moment(moment(firstTime, "hh:mm").subtract(1, "years"), "hh:mm").format("hh:mm A");

    database.ref().push({
        name: newName,
        dest: newdest,
        start: firstTime,
        freq: newfreq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

    var sv = snapshot.val();

   
   
    var name = sv.name;
    var dest = sv.dest;
    var start = sv.start;
    var freq = sv.freq;

    //
    console.log(start);
    console.log(freq);

    // Difference between the times

    var currentTime = moment();
    console.log("current time " + moment(currentTime).format("hh:mm"));

    // Difference between the times

    //var diffTime = moment().diff(moment(firstTime), "minutes");
    var diffTime = moment().diff(moment(start, "HH:mm"), "minutes")


    console.log("difference in time " + diffTime);

    // Calculate minutes away
    var timeRemaining = diffTime % freq;
    var timeMinsAway = freq - timeRemaining;


    // Calculate next arrival
    var timeNext = moment().add(timeMinsAway, 'm');
    console.log("arrival time " + timeNext);

    // Set variables
    var arrival = moment(timeNext).format("hh:mm A");
    console.log("Formatted minutes: " + arrival);
    var away = timeMinsAway;
    console.log("Minutes away: " + away);


    var row = $('<tr></tr>').appendTo('#table-body');
    $('<td></td>').appendTo(row).text(name);
    $('<td></td>').appendTo(row).text(dest);
    $('<td></td>').appendTo(row).text(freq);
    $('<td></td>').appendTo(row).text(arrival);
    $('<td></td>').appendTo(row).text(away);



    // 
    // var timeRemaining = timeDifference % freq;
    // var timeMinsAway = freq - timeRemaining;
    // //console.log("Time diff in minutes:" + timeDifference); 
    // //console.log("Time remaining before the next train:" + timeRemaining);

});
//    function(errorObject) {
//        console.log("Errors handled: " + errorObject.code);


//    });

