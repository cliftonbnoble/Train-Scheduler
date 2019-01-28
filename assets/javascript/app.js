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

  //Global Variables
  let trainName = "";
  let destination = "";
  let firstTrainTime = "";
  let frequency = "";

  $("#run-search").on("click", function(event) {
    //   $("#form-group").reset();
      console.log("Working!")
      //Don't refresh the page
      event.preventDefault();
      //Code to store user input into our database
      trainName = $('#train-input').val().trim();
      destination = $('#destination-input').val().trim();
      firstTrainTime = $('#first-train-input').val().trim();
      frequency = $('#frequency-input').val().trim();
      console.log(trainName);
      console.log(destination);
      console.log(firstTrainTime);
      console.log(frequency);
    //   $('.form-group').val("");
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

  //Variable to reference the database
  let database = firebase.database();

  database.ref().on(
      "value", 
      function(snapshot) {
      $("#train-input").append(snapshot.val().trainName);
      $('#destination-input').append(snapshot.val().destination);
      $('#first-train-input').append(snapshot.val().firstTrainTime);
      $('#frequency-input').append(snapshot.val().frequency);
      
  }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      
  });

//   console.log(startDate.moment().diff(moment(), 'months'));
//   console.log(startDate.diff(newDate, "month"));
  firebase.database().ref().on("child_added", function (snapshot) {
    $("#train-table").append("<tr>");
    $("#train-table").append("<td>" + snapshot.val().trainName);
    $("#train-table").append("<td>" + snapshot.val().destination);
    $("#train-table").append("<td>" + snapshot.val().frequency);
    $("#train-table").append("<td>" + snapshot.val().firstTrainTime + "<td>");
    $("#train-table").append("<hr>");
})
  database
        .ref()
        .orderByChild("dateAdded")
        .limitToLast(1)
        .on("child_added", function(snapshot) {
          // Change the HTML to reflect
          $("#train-input").text(snapshot.val().trainName);
          $("#destination-input").text(snapshot.val().destination);
          $("#first-train-input").text(snapshot.val().firstTrainTime);
          $("#frequency-input").text(snapshot.val().frequency);
        });