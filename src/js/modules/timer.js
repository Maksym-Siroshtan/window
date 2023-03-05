const timer = (selector, deadline) => {
  const addZero = (num) => {
    if (num <= 9) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      t,
      seconds,
      minutes,
      hours,
      days,
    };
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
      seconds = timer.querySelector("#seconds"),
      minutes = timer.querySelector("#minutes"),
      hours = timer.querySelector("#hours"),
      days = timer.querySelector("#days"),
      timerInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      seconds.textContent = addZero(t.seconds);
      minutes.textContent = addZero(t.minutes);
      hours.textContent = addZero(t.hours);
      days.textContent = addZero(t.days);

      if (t.t <= 0) {
        seconds.textContent = "00";
        minutes.textContent = "00";
        hours.textContent = "00";
        days.textContent = "00";

        clearInterval(timerInterval);
      }
    }
  };

  setClock(selector, deadline);
};

export default timer;
