import { cn } from "@/lib/utils";

export default function ProgressBar({ current, total, className }) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1.5">
        <span>Question {current} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}