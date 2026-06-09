import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StarRating({ stars, max = 3, size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",
    xl: "w-14 h-14",
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            "transition-all duration-300",
            i < stars
              ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
              : "text-muted-foreground/30"
          )}
          style={i < stars ? { animationDelay: `${i * 150}ms` } : {}}
        />
      ))}
    </div>
  );
}