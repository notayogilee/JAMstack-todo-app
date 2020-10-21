import React, { useEffect, useState, useRef } from 'react';

export default function Timer() {

  const [showTimer, setShowTimer] = useState(false);

  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('October 26, 2020 18:00:00').getTime();


    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      const seconds = Math.floor(distance % (1000 * 60) / 1000);

      setShowTimer(true);
      if (distance < 0) {
        // stop our timer
        setShowTimer(false)
        clearInterval(interval.current);
      } else {
        //update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }

    }, 1000)
  }

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    }
  }, [])

  return (
    <div>
      {showTimer &&
        <h5>Next live class in {timerDays} days {timerHours} hours {timerMinutes} minutes {timerSeconds} seconds</h5>
      }

    </div>
  )
}
