import { useEffect, useRef, useState } from "react";

const DiscountTimer = () => {
  const getOrCreateTargetDate = () => {
    const saved = localStorage.getItem("discountTargetDate");
    if (saved) return parseInt(saved, 10);

    const newTarget = new Date().getTime() + 1000 * 60 * 60 * 24 * 25; // --> 25 days
    localStorage.setItem("discountTargetDate", newTarget);
    return newTarget;
  };

  const targetDate = useRef(getOrCreateTargetDate());

  const getTimeRemaining = () => {
    const now = new Date().getTime();
    const difference = targetDate.current - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  const format = (num) => String(num).padStart(2, "0");

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeLeft(remaining);
      const isTimeUp =
        remaining.days <= 0 &&
        remaining.hours <= 0 &&
        remaining.minutes <= 0 &&
        remaining.seconds <= 0;

      if (isTimeUp) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer); // --> Cleanup on unmount
  }, []);

  return (
    <div className="flex justify-center md:justify-start space-x-8 text-2xl font-semibold my-6">
      <div>
        <span className="text-3xl text-pink-500">{format(timeLeft.days)}</span>
        <br />
        Days
      </div>
      <div>
        <span className="text-3xl text-pink-500">{format(timeLeft.hours)}</span>
        <br />
        Hrs
      </div>
      <div>
        <span className="text-3xl text-pink-500">
          {format(timeLeft.minutes)}
        </span>
        <br />
        Min
      </div>
      <div>
        <span className="text-3xl text-pink-500">
          {format(timeLeft.seconds)}
        </span>
        <br />
        Sec
      </div>
    </div>
  );
};

export default DiscountTimer;
