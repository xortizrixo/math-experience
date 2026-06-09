import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import StarRating from "./StarRating";

export default function LevelCard({ level, isUnlocked, completedData, onClick }) {
  const stars = completedData?.stars || 0;

  return (
    <motion.button
      whileHover={isUnlocked ? { scale: 1.04, y: -4 } : {}}
      whileTap={isUnlocked ? { scale: 0.97 } : {}}
      onClick={() => isUnlocked && onClick(level)}
      className={cn(
        "relative rounded-2xl p-5 text-left transition-all w-full",
        "border-2 shadow-lg",
        isUnlocked
          ? "cursor-pointer border-transparent hover:shadow-xl"
          : "cursor-not-allowed border-muted opacity-50"
      )}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-90",
          isUnlocked ? `bg-gradient-to-br ${level.color}` : "bg-muted"
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{level.emoji}</span>
          {!isUnlocked && <Lock className="w-5 h-5 text-muted-foreground" />}
          {isUnlocked && completedData && <StarRating stars={stars} size="sm" />}
        </div>
        <div className={cn(isUnlocked ? "text-white" : "text-muted-foreground")}>
          <p className="text-xs font-medium opacity-80 mb-0.5">Level {level.id}</p>
          <h3 className="font-heading font-bold text-lg leading-tight">{level.name}</h3>
          <p className="text-xs mt-1 opacity-80">{level.description}</p>
        </div>
      </div>
    </motion.button>
  );
}