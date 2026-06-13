import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { LEVELS } from "@/lib/gameData";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LevelCard from "@/components/game/LevelCard";
import StatsPanel from "@/components/game/StatsPanel";
import BadgeGrid from "@/components/game/BadgeGrid";
import BottomNav from "@/components/game/BottomNav";
import DeleteAccountDialog from "@/components/game/DeleteAccountDialog";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("levels");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

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
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
        <div
          className="relative px-6 pb-6 max-w-2xl mx-auto"
          style={{ paddingTop: "calc(2rem + env(safe-area-inset-top))" }}
        >
          {/* Settings button */}
          <div className="absolute top-0 right-6" style={{ top: "calc(1rem + env(safe-area-inset-top))" }}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setShowSettings((s) => !s)}
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>

          {/* Settings panel */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-4 top-14 z-50 bg-card border border-border rounded-2xl shadow-xl p-3 min-w-[180px]"
              style={{ top: "calc(3.5rem + env(safe-area-inset-top))" }}
            >
              <button
                onClick={() => { setShowSettings(false); setShowDeleteDialog(true); }}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </motion.div>
          )}

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
      <div className="max-w-2xl mx-auto px-6 pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="levels">
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

          <TabsContent value="badges">
            <BadgeGrid earnedBadges={progress?.badges} />
          </TabsContent>

          <TabsContent value="stats">
            <StatsDetail progress={progress} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Nav */}
      <BottomNav active={activeTab} onChange={setActiveTab} />

      {/* Delete Account Dialog */}
      <DeleteAccountDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
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