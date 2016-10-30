
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
        var diff = moment.duration(time.diff(now));

        console.log(now.format());
        console.log(time.format());
        console.log(diff.humanize(true));
        console.log(moment().add(diff).calendar());
        document.getElementById('timerValue').innerHTML = moment().add(diff).calendar();
      }
