function sendLog(type, msg) {
    //In a typical setup, this sends the data to the server at http://localhost:3000/log
    $.ajax({
        url: '/log',
        method: 'POST',
        data: {
            "type": $('#logType').val(),
            "msg": $('#msg').val()
        },
        success: function(){
            $('#result').text('Congratulations! You logged a client message without exposing your log token.');
            $('#result').show();
        },
        error: function (err){
            $('#result').text('Ooops! An error occured: ' + err.responseText);
            $('#result').show();
        }
    });
}
