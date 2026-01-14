"use client";

import { useEffect, useState } from "react";

interface LoadingBarProps {
  loading: boolean;
}

export default function LoadingBar({ loading }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    setTimeout(() => {
      if (loading) {
          setVisible(true);
          setProgress(10);
          
          interval = setInterval(() => {
            setProgress(prev => {
              if (prev >= 40) return prev;
              return prev + 5;
            });
          }, 300);
        } else {
        setProgress(100);
        
        setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 400);
      }
    }, 0);

    return () => clearInterval(interval);
  }, [loading]);

  if (!visible) return null;

  return (
    <div className="w-full h-1 bg-transparent z-50">
      <div
        className="fixed top-22 left-0 h-1 bg-secondary transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
