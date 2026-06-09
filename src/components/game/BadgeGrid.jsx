import { BADGES } from "@/lib/gameData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function BadgeGrid({ earnedBadges }) {
  const earned = earnedBadges || [];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {BADGES.map((badge, i) => {
        const isEarned = earned.includes(badge.id);
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "rounded-2xl p-4 text-center border transition-all",
              isEarned
                ? "bg-card shadow-md border-secondary"
                : "bg-muted/50 border-transparent opacity-40 grayscale"
            )}
          >
            <span className="text-3xl block mb-1">{badge.emoji}</span>
            <p className="font-heading font-bold text-xs">{badge.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{badge.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}