import { useState, useEffect } from "react";

export const useTime = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = sessionStorage.getItem("exam-time-left");
    if (savedTime) {
      return savedTime;
    }
    return "30:00";
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const [minutes, seconds] = prevTime.split(":").map(Number);
        let totalSeconds = minutes * 60 + seconds;

        if (totalSeconds <= 0) {
          clearInterval(timer);
          alert("Time's up! Your exam will be submitted automatically.");
          return "00:00";
        }

        totalSeconds--;
        const newMinutes = Math.floor(totalSeconds / 60);
        const newSeconds = totalSeconds % 60;
        const newTime = `${newMinutes.toString().padStart(2, "0")}:${newSeconds
          .toString()
          .padStart(2, "0")}`;

        sessionStorage.setItem("exam-time-left", newTime);

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return { timeLeft, setTimeLeft };
};
