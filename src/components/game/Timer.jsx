import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Timer({ seconds, onTimeUp, isRunning }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    setTime(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!isRunning || time <= 0) return;
    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          onTimeUp?.();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, time <= 0]);

  const pct = (time / seconds) * 100;
  const isLow = time <= 10;

  return (
    <div className="flex items-center gap-2">
      <Clock className={cn("w-5 h-5", isLow ? "text-destructive animate-pulse" : "text-muted-foreground")} />
      <div className="w-24 h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 linear",
            isLow ? "bg-destructive" : "bg-accent"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={cn("text-sm font-bold min-w-[2rem] tabular-nums", isLow && "text-destructive")}>
        {time}s
      </span>
    </div>
  );
}