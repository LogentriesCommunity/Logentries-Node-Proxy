function sendLog (type, msg){
  console.log ($('#msg'))
  $.ajax ({
    url: '/log',
    method: 'POST',
    data: {
      "type": 'info',
      "msg": $('#msg').val()
    }
  });
}
