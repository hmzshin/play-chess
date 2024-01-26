import React, { useEffect, useState } from "react";

const Timer = ({ turn, isMoved }) => {
  const [countWhite, setCountWhite] = useState(5 * 60 * 1000);
  const [countBlack, setCountBlack] = useState(5 * 60 * 1000);

  const players = [
    { player: " White", timer: countBlack },
    { player: " Black", timer: countWhite },
  ];
  useEffect(() => {
    if (isMoved) {
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
    }
  }, [turn, isMoved]);

  const formatTime = (milliseconds: number) => {
    const minutes: number = Math.floor(milliseconds / 60000);
    const seconds: any = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <section className="w-[300px] h-[100px] border border-slate-700 flex">
      {players.map((player) => (
        <div className="w-1/2 bg-indigo-400 border flex flex-col justify-center items-center">
          <p>{player.player}</p>
          {formatTime(player.timer)}
        </div>
      ))}
    </section>
  );
};

export default Timer;
