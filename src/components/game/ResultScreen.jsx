import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, RotateCcw, Home } from "lucide-react";
import StarRating from "./StarRating";
import { BADGES } from "@/lib/gameData";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function ResultScreen({ correct, total, stars, newBadges, onRetry, onNext, onHome, hasNext }) {
  const pct = Math.round((correct / total) * 100);

  useEffect(() => {
    if (stars >= 2) {
      confetti({
        particleCount: stars === 3 ? 150 : 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#06b6d4", "#facc15", "#f43f5e", "#22c55e"],
      });
    }
  }, []);

  const messages = [
    "Keep practicing! You'll get there! 💪",
    "Good effort! Try again for more stars! 😊",
    "Great job! You're getting better! 🎉",
    "Amazing! You're a math superstar! 🌟",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center max-w-md mx-auto px-4"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-6xl mb-4"
      >
        {stars === 3 ? "🏆" : stars === 2 ? "🎉" : stars === 1 ? "👍" : "💪"}
      </motion.div>

      <h2 className="font-heading font-bold text-3xl mb-2">
        {stars >= 2 ? "Level Complete!" : "Nice Try!"}
      </h2>
      <p className="text-muted-foreground mb-6">{messages[stars]}</p>

      <div className="bg-card rounded-2xl p-6 w-full shadow-lg border mb-6">
        <div className="flex justify-center mb-4">
          <StarRating stars={stars} size="xl" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-3xl font-heading font-bold text-primary">{correct}</p>
            <p className="text-xs text-muted-foreground">Correct</p>
          </div>
          <div>
            <p className="text-3xl font-heading font-bold text-accent">{pct}%</p>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </div>
        </div>
      </div>

      {newBadges.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-secondary/30 rounded-2xl p-4 w-full mb-6 border border-secondary"
        >
          <p className="font-heading font-bold text-sm mb-3">🎖️ New Badges Earned!</p>
          <div className="flex flex-wrap justify-center gap-3">
            {newBadges.map((id) => {
              const badge = BADGES.find((b) => b.id === id);
              return badge ? (
                <div key={id} className="flex items-center gap-1.5 bg-card rounded-full px-3 py-1.5 shadow-sm">
                  <span className="text-lg">{badge.emoji}</span>
                  <span className="text-xs font-medium">{badge.name}</span>
                </div>
              ) : null;
            })}
          </div>
        </motion.div>
      )}

      <div className="flex gap-3 w-full">
        <Button variant="outline" onClick={onHome} className="flex-1 rounded-xl h-12">
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        <Button variant="outline" onClick={onRetry} className="flex-1 rounded-xl h-12">
          <RotateCcw className="w-4 h-4 mr-2" />
          Retry
        </Button>
        {hasNext && stars >= 1 && (
          <Button onClick={onNext} className="flex-1 rounded-xl h-12 bg-primary hover:bg-primary/90">
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}