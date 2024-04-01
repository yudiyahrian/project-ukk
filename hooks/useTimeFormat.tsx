"use client"

import { useState, useEffect } from 'react';

const useTimeFormat = (date: Date) => {
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    const calculateTimeDifference = () => {
      const now = new Date();
      const difference = now.getTime() - date.getTime();
      const seconds = Math.floor(difference / 1000);

      if (seconds < 60) {
        setFormattedTime(`${seconds}s`);
      } else if (seconds < 3600) {
        setFormattedTime(`${Math.floor(seconds / 60)}m`);
      } else if (seconds < 86400) {
        setFormattedTime(`${Math.floor(seconds / 3600)}h`);
      } else {
        const days = Math.floor(seconds / 86400);
        setFormattedTime(`${days}d`);
      }
    };

    calculateTimeDifference();
    const intervalId = setInterval(calculateTimeDifference, 60000);

    return () => clearInterval(intervalId);
  }, [date]);

  return formattedTime;
};

export default useTimeFormat;