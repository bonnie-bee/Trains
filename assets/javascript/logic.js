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


$(`#submitBtn`).on('click', function (event) {
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
    timeUpdate();
})

timeUpdate();
setInterval(timeUpdate, 30000)


function timeUpdate() {

    $('tbody').empty();

    database.ref().on("child_added", function (buckets) {

        prevName = buckets.val().Name;
        prevDest = buckets.val().Destination;
        prev1Time = buckets.val().First;
        prevFreq = buckets.val().Frequent;

        timeTrain();

        console.log(buckets.val())

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

};

function timeTrain() {
    let trainFreq = parseInt(prevFreq);
    let firstTime = prev1Time;

    let timeConvert = moment(firstTime, "hh:mm").subtract(1, 'year');
    let currentTime = moment();
    let diffTime = moment().diff(moment(timeConvert), "minutes");
    let tRemainder = diffTime % trainFreq;
    let minTilTrain = trainFreq - tRemainder;
    let nextTrain = moment().add(minTilTrain, 'minutes').format('hh:mm');


    newRow = $('<tr>').html(`<td></td><td>${prevName}</td><td>${prevDest}</td><td>${nextTrain}</td><td>${minTilTrain}</td>`)

    $('tbody').append(newRow)
};