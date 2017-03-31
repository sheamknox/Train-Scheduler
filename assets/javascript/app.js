// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDQZCjmt-oDfO1zjKeu1AleQVo0SOKXtrs",
    authDomain: "train-schedule-85591.firebaseapp.com",
    databaseURL: "https://train-schedule-85591.firebaseio.com",
    storageBucket: "train-schedule-85591.appspot.com",
    messagingSenderId: "880745483244"
  };
firebase.initializeApp(config);
var database = firebase.database();

var trainName;
var destination;
var firstTrain;
var frequency;

$("#submit").on("click", function(event){
	event.preventDefault();
	getTrain();
});



function getTrain() {
trainName = $("#trainName").val().trim();
destination = $("#destination").val().trim();
firstTrain = $("#firstTrain").val().trim();
frequency = $("#frequency").val().trim();
console.log(trainName);
console.log(destination);
console.log(firstTrain);
console.log(frequency);

database.ref().push({
  trainName : trainName,
  destination : destination,
  firstTrain : firstTrain,
  frequency : frequency,
});
};

database.ref().on("child_added", function(snapshot){

var tableR = $('<tr>');
var userTrain = '<td>'+snapshot.val().trainName+'</td>';
var userDestination = '<td>'+snapshot.val().destination+'</td>';
var userFrequency = '<td>'+snapshot.val().frequency+'</td>';
// var userFirstTrain = '<td>'+snapshot.val().firstTrain+'</td>';

tableR.append(userTrain);
tableR.append(userDestination);
tableR.append(userFrequency);
// tableR.append(userFirstTrain);

$('tbody').append(tableR);

});