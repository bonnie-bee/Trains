// Initialize Firebase
var config = {
    apiKey: "AIzaSyA4LUrZK3cXi1VBGd8cRAchiyCvMqP2USo",
    authDomain: "trains-a3434.firebaseapp.com",
    databaseURL: "https://trains-a3434.firebaseio.com",
    projectId: "trains-a3434",
    storageBucket: "trains-a3434.appspot.com",
    messagingSenderId: "213238844254"
};

firebase.initializeApp(config);


const database = firebase.database();





$(`#submitBtn`).on('click', function(event) {
    event.preventDefault();

    trainName = $('#trainName').val().trim()
    destination = $('#destination').val().trim()
    firstTrain = $('#firstTrainTime').val().trim()
    frequency = $('#frequency').val().trim()

    database.ref().push({
        Name: trainName,
        Destination: destination,
        First: firstTrain,
        Frequent: frequency
    })

    $('#trainName').val(" ");
    $('#destination').val(" ");
    $('#firstTrainTime').val(" ");
    $('#frequency').val(" ");


    


})



database.ref().on("child_added", function(buckets) {

    prevName = buckets.val().Name;
    prevDest = buckets.val().Destination;
    prev1Time = buckets.val().First;
    prevFreq = buckets.val().Frequent;
    
    
    let newRow = $('<tr>').html(`<td></td><td>${prevName}</td><td>${prevDest}</td><td>${prev1Time}</td><td>${prevFreq}</td>`)

    $('tbody').append(newRow)
    
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });