let workTitle = document.getElementById('work'); // Corrected typo in 'Title'
let breakTitle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00";

// Display initial values
window.onload = () => {
  document.getElementById('minutes').innerHTML = workTime;
  document.getElementById('seconds').innerHTML = seconds;

  workTitle.classList.add('active'); // Corrected typo in 'Title'
};

function start() {
  document.getElementById('start').style.display = "none";
  document.getElementById('reset').style.display = "block";

  seconds = 59;
  let workMinutes = workTime - 1;
  let breakMinutes = breakTime - 1;

  let breakCount = 0;

  let timeFunction = () => {
    document.getElementById('minutes').innerHTML = workMinutes;
    document.getElementById('seconds').innerHTML = seconds;

    seconds = seconds - 1;
    if (seconds === 0) {
      workMinutes = workMinutes - 1;
      if (workMinutes === -1) {
        if (breakCount % 2 === 0) { // Work -> Break cycle
          workMinutes = breakMinutes;
          breakCount++;
          workTitle.classList.remove('active');
          breakTitle.classList.add('active');
        } else { // Break -> Work cycle
          workMinutes = workTime;
          breakCount++;
          workTitle.classList.add('active');
          breakTitle.classList.remove('active');
        }
      }
      seconds = 59;
    }
  };

  let intervalId = setInterval(timeFunction, 1000);

  // Reset function
  function resetTimer() {
    clearInterval(intervalId); // Stop the timer

    seconds = "00";
    workMinutes = workTime;
    breakMinutes = breakTime;
    breakCount = 0;

    // Update display to initial values
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.add('active');
    breakTitle.classList.remove('active');

    // Optionally, re-enable the start button
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";
  }

  // Add event listener to the reset button
  document.getElementById('reset').addEventListener('click', resetTimer);
}
