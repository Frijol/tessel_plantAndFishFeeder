
    // Add eventlistener to buttons
    var pumpButton = document.getElementById('pump');
    pumpButton.addEventListener('click', togglePump);

    var setTimerButton = document.getElementById('setTimer');
    setTimerButton.addEventListener('click', getDiffTime);


    function togglePump (event) {
      console.log('call event');
      var button = event.target;
      var statusNode = button.parentNode.querySelector('.led-status');

    //  $.get('/pump/', null, function(data){
      //  $('#results').html(data);
    //  });

      var req = new XMLHttpRequest();
      req.onreadystatechange = function(e) {
        if (req.readyState == 4 && req.status == 200) {
          if (req.status == 200) {
            var response = JSON.parse(req.responseText);
            statusNode.textContent = response.on ? 'ON' : 'OFF';
          } else {
            console.log('Error');
          }
        }
      }
      req.open('GET', '/pump/', true);
      req.send();
      }

      function getDiffTime(){

        //get the user values
        var hours = document.getElementById('hours');
        var minutes = document.getElementById('minutes');

        var hour = hours.options[hours.selectedIndex].value;
        var minute = minutes.options[minutes.selectedIndex].value;

        // create new date from user valuse
        var time = moment().hours(parseInt(hour)).minutes(parseInt(minute));
        var now = moment();

        if(moment(time).isBefore(now)){
          time.add(1, 'days');
        }
        console.log('time after: ' + time.format());
        console.log('UTC: ' + moment.utc(time).format());
        timeUTC = moment.utc(time);
        document.getElementById('timerValue').innerHTML = moment().calendar(time);

        var timer = {
          time: time,
          duration: 2,
          repeat: 24
        };

        $.ajax({
          type: "POST",
          url: "/timer/add/",
          data: JSON.stringify(timer),
          dataType: "json",
          contentType: "application/json"
        });
      }
