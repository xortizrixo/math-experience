import { Gamepad2, Award, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { value: "levels", label: "Levels", icon: Gamepad2 },
  { value: "badges", label: "Badges", icon: Award },
  { value: "stats", label: "Stats", icon: BarChart3 },
];

export default function BottomNav({ active, onChange }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map(({ value, label, icon: Icon }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} />
            <span className={cn("text-[10px] font-heading font-bold", isActive && "text-primary")}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}