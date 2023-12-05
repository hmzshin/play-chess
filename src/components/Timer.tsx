import React, { useEffect, useState } from "react";

const Timer = ({ turn }) => {
  const [countWhite, setCountWhite] = useState(3 * 60 * 1000);
  const [countBlack, setCountBlack] = useState(60 * 1000);
  useEffect(() => {
    const timerId = setInterval(() => {
      if (turn == "black") {
        setCountWhite((prevCountWhite) => {
          if (prevCountWhite === 0) {
            clearInterval(timerId);
            console.log(`Timing event cleared.`);
            return 0;
          }
          return prevCountWhite - 1000;
        });
      } else {
        setCountBlack((prevCountBlack) => {
          if (prevCountBlack === 0) {
            clearInterval(timerId);
            console.log(`Timing event cleared.`);
            return 0;
          }
          return prevCountBlack - 1000;
        });
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [turn]);

  const formatTime = (milliseconds: number) => {
    const minutes: number = Math.floor(milliseconds / 60000);
    const seconds: any = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    console.log("**********turn updated***********");
  }, [turn]);

  return (
    <section className="w-[300px] h-[150px] border border-slate-700 flex">
      {[countWhite, countBlack].map((count) => (
        <div className="w-1/2 bg-indigo-400 border flex justify-center items-center">
          {formatTime(count)}
        </div>
      ))}
    </section>
  );
};

export default Timer;
