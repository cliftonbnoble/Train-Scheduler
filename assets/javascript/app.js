$(document).ready(function () {
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBFtHqDL1eaHBo4otOz0TCfSIIKzhUTovw",
    authDomain: "train-scheduler-dd314.firebaseapp.com",
    databaseURL: "https://train-scheduler-dd314.firebaseio.com",
    projectId: "train-scheduler-dd314",
    storageBucket: "train-scheduler-dd314.appspot.com",
    messagingSenderId: "980059258456"
  };
  firebase.initializeApp(config);

  //form Variables (user input)
  let trainName = "";
  let destination = "";
  let firstTrainTime = "";
  let frequency = "";
  //Time Conversion
  let currentTime = moment().format("hh:mm");
  let firstTimeConverted = "";
  let diffTime = "";
  let tRemainder;
  let tMinutesTillTrain;
  let nextTrain;
  let nextTrainFormat;
  //Database Variable
  let database = firebase.database();

  $("#current-time").text(currentTime);
  console.log(currentTime);
  
  $("#run-search").on("click", function(event) { 
      //Don't refresh the page
      event.preventDefault();
      //Code to store user input into our database
      trainName = $('#train-input').val().trim();
      destination = $('#destination-input').val().trim();
      firstTrainTime = $('#first-train-input').val().trim();
      frequency = $('#frequency-input').val().trim();
   
    //Clear the form after submit
      $('#train-input').val("");
      $('#destination-input').val("");
      $('#first-train-input').val("");
      $('#frequency-input').val("");

      //Push to database
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
      daded: firebase.database.ServerValue.TIMESTAMP
  });
  });


  firebase.database().ref().on("child_added", function (snapshot) {
    //Conversion
			//Convert to HH:MM
			firstTimeConverted = moment(snapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
			//Converts the firsTimeCover object into string
			
			 // Current Time
		  currentTime = moment();
			diffTime = moment().diff(moment(firstTimeConverted), "minutes");
			
			// Time apart (remainder)
			tRemainder = diffTime % snapshot.val().frequency;

			// Minute Until Train
			tMinutesTillTrain = snapshot.val().frequency - tRemainder;
    		
    		// Next Train
			nextTrain = moment().add(tMinutesTillTrain, "minutes");
			nextTrainFormat = moment(nextTrain).format('hh:mm');

    $("#train-table").append("<tr>");
    $("#train-table").append("<td>" + snapshot.val().trainName);
    $("#train-table").append("<td>" + snapshot.val().destination);
    $("#train-table").append("<td>" + snapshot.val().frequency);
    $("#train-table").append("<td>" + nextTrainFormat);
    $("#train-table").append("<td>" + tMinutesTillTrain);
    $("#train-table").append("<hr>");
    console.log("First Train Time: ", firstTimeConverted);
    console.log("Current Time: ", currentTime);
    console.log("Remainder: ", tRemainder);
    console.log("Minutes Unitl Train", tMinutesTillTrain);

})
  // database
  //       .ref()
  //       .orderByChild("dateAdded")
  //       .limitToLast(1)
  //       .on("child_added", function(snapshot) {
  //         // Change the HTML to reflect
  //         $("#train-input").text(snapshot.val().trainName);
  //         $("#destination-input").text(snapshot.val().destination);
  //         $("#first-train-input").text(snapshot.val().firstTrainTime);
  //         $("#frequency-input").text(snapshot.val().tRemainder);

  //       });
      })
      