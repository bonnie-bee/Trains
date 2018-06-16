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

    let trainName = $('#trainName').val().trim()
    let destination = $('#destination').val().trim()
    let firstTrain = $('#firstTrainTime').val().trim()
    let frequency = $('#frequency').val().trim()

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


    let newRow = $('<tr>').html(`<td></td><td>${trainName}</td><td>${destination}</td><td>${firstTrain}</td><td>${frequency}</td>`)

    $('tbody').append(newRow)


})