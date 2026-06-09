import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { LEVELS } from "@/lib/gameData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Award, BarChart3 } from "lucide-react";
import LevelCard from "@/components/game/LevelCard";
import StatsPanel from "@/components/game/StatsPanel";
import BadgeGrid from "@/components/game/BadgeGrid";

export default function Home() {
  const navigate = useNavigate();

  const { data: progressList, isLoading } = useQuery({
    queryKey: ["gameProgress"],
    queryFn: () => base44.entities.GameProgress.list(),
    initialData: [],
  });

  const progress = progressList[0] || null;
  const currentLevel = progress?.current_level || 1;
  const completedLevels = progress?.levels_completed || [];

  const getCompletedData = (levelId) =>
    completedLevels.find((l) => l.level === levelId);

  const handleLevelClick = (level) => {
    navigate(`/play?level=${level.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
        <div className="relative px-6 pt-8 pb-6 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <span className="text-5xl mb-3 block animate-float">🧮</span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-1">
              Math Quest
            </h1>
            <p className="text-muted-foreground text-sm">
              Practice math, earn stars, become a champion!
            </p>
          </motion.div>

          {!isLoading && <StatsPanel progress={progress} />}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pb-10">
        <Tabs defaultValue="levels" className="mt-6">
          <TabsList className="w-full bg-muted/70 rounded-2xl h-12 p-1">
            <TabsTrigger
              value="levels"
              className="flex-1 rounded-xl font-heading font-bold text-sm data-[state=active]:shadow-md"
            >
              <Gamepad2 className="w-4 h-4 mr-1.5" />
              Levels
            </TabsTrigger>
            <TabsTrigger
              value="badges"
              className="flex-1 rounded-xl font-heading font-bold text-sm data-[state=active]:shadow-md"
            >
              <Award className="w-4 h-4 mr-1.5" />
              Badges
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="flex-1 rounded-xl font-heading font-bold text-sm data-[state=active]:shadow-md"
            >
              <BarChart3 className="w-4 h-4 mr-1.5" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="levels" className="mt-5">
            <div className="grid grid-cols-2 gap-3">
              {LEVELS.map((level, i) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <LevelCard
                    level={level}
                    isUnlocked={level.id <= currentLevel}
                    completedData={getCompletedData(level.id)}
                    onClick={handleLevelClick}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-5">
            <BadgeGrid earnedBadges={progress?.badges} />
          </TabsContent>

          <TabsContent value="stats" className="mt-5">
            <StatsDetail progress={progress} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatsDetail({ progress }) {
  if (!progress) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-4xl mb-3">📊</p>
        <p className="font-heading font-bold">No stats yet!</p>
        <p className="text-sm">Start playing to track your progress.</p>
      </div>
    );
  }

  const accuracy = progress.total_problems_solved
    ? Math.round((progress.total_correct / progress.total_problems_solved) * 100)
    : 0;

  const stats = [
    { label: "Total Stars", value: progress.total_stars || 0, emoji: "⭐" },
    { label: "Levels Completed", value: (progress.levels_completed || []).length, emoji: "🏆" },
    { label: "Problems Solved", value: progress.total_problems_solved || 0, emoji: "🧩" },
    { label: "Correct Answers", value: progress.total_correct || 0, emoji: "✅" },
    { label: "Accuracy", value: `${accuracy}%`, emoji: "🎯" },
    { label: "Day Streak", value: progress.streak_days || 0, emoji: "🔥" },
    { label: "Badges Earned", value: (progress.badges || []).length, emoji: "🎖️" },
    { label: "Max Stars (per level)", value: 3, emoji: "🌟" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="bg-card rounded-2xl p-4 border shadow-sm text-center"
        >
          <span className="text-2xl block mb-1">{s.emoji}</span>
          <p className="font-heading font-bold text-xl">{s.value}</p>
          <p className="text-[11px] text-muted-foreground">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}