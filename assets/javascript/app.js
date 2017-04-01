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

var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
console.log("TIME CONVERTED: " + firstTimeConverted);
    
var diffTime = moment.duration(moment().diff(moment(firstTrain, "HH:mm")), 'milliseconds').asMinutes();
    
console.log("DIFFERENCE IN TIME: " + diffTime);

var timeRemaining = frequency - (Math.floor(diffTime) % frequency);
console.log(timeRemaining);

var nextArrival = moment().add(timeRemaining, 'minutes' );

console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));

var minutesAway = Math.ceil(moment.duration(moment(nextArrival).diff(moment()), 'milliseconds').asMinutes());
console.log("MINUTES TILL TRAIN: " + minutesAway);

database.ref().push({
  trainName : trainName,
  destination : destination,
  firstTrain : firstTrain,
  frequency : frequency,
  nextArrival: nextArrival,
  minutesAway: minutesAway,
});
};

database.ref().on("child_added", function(snapshot){

var tableR = $('<tr>');
var userTrain = '<td>'+snapshot.val().trainName+'</td>';
var userDestination = '<td>'+snapshot.val().destination+'</td>';
var userFrequency = '<td>'+snapshot.val().frequency+'</td>';
var userFirstTrain = '<td>'+snapshot.val().firstTrain+'</td>';
var userNextArrival = '<td>'+snapshot.val().nextArrival+'</td>';
var userMinutesAway = '<td>'+snapshot.val().minutesAway+'</td';

tableR.append(userTrain);
tableR.append(userDestination);
tableR.append(userFrequency);
tableR.append(userNextArrival);
tableR.append(userMinutesAway);

$('tbody').append(tableR);

});