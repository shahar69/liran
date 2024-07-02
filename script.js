$(document).ready(function() {
  $("#motorSpeed").knob({
    'min': 1,
    'max': 16,
    'width': 100,
    'height': 100,
    'release': function (v) { sendSpeed('motor', v); }
  });
  $("#fanSpeed").knob({
    'min': 0,
    'max': 255,
    'width': 100,
    'height': 100,
    'release': function (v) { sendSpeed('fan', v); }
  });

  updateStatus();
});

function sendCommand(device, command) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/" + device + "?command=" + command, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateStatus();
    }
  }
  xhr.send();
}

function sendSpeed(device, speed) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/" + device + "?speed=" + speed, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateStatus();
    }
  }
  xhr.send();
}

function updateStatus() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/status", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var status = JSON.parse(xhr.responseText);
      $("#motorStatus").text("Speed: " + status.motorSpeed);
      $("#fanStatus").text("Speed: " + status.fanSpeed);
      $("#pumpStatus").text("Pump is " + (status.pumpState ? "ON" : "OFF"));

      $("#motorStatusDetails").text("Speed: " + status.motorSpeed + ", Direction: " + (status.motorDirection == 1 ? "Clockwise" : "Counterclockwise"));
      $("#fanStatusDetails").text("Speed: " + status.fanSpeed);
      $("#pumpStatusDetails").text("Pump is " + (status.pumpState ? "ON" : "OFF"));
    }
  }
  xhr.send();
}
