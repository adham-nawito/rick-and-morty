import { useEffect, useState } from 'react';
import '../styles/Timer.css';

type Props = {
  onRefresh: () => void;
  interval?: number;
}

const Timer = ({ onRefresh, interval = 30 }: Props) => {
  const [count, setCount] = useState(interval);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          onRefresh();
          return interval;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [paused, interval, onRefresh]);

  return (
    <div className="timer">
      <span>Auto-refresh in: {count}s</span>
      <button onClick={() => setPaused(!paused)}>
        {paused ? 'Resume' : 'Pause'}
      </button>
      <button onClick={() => { onRefresh(); setCount(interval); }}>
        Refresh Now
      </button>
    </div>
  );
};

export default Timer;