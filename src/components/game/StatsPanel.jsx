import { Star, Trophy, Zap, Target } from "lucide-react";

export default function StatsPanel({ progress }) {
  const stats = [
    {
      icon: Star,
      label: "Stars",
      value: progress?.total_stars || 0,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      icon: Trophy,
      label: "Levels",
      value: (progress?.levels_completed || []).length,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      icon: Zap,
      label: "Streak",
      value: `${progress?.streak_days || 0}d`,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: Target,
      label: "Accuracy",
      value: progress?.total_problems_solved
        ? `${Math.round(((progress.total_correct || 0) / progress.total_problems_solved) * 100)}%`
        : "—",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className={`${s.bg} rounded-2xl p-3 text-center`}>
          <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
          <p className="font-heading font-bold text-lg">{s.value}</p>
          <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
        </div>
      ))}
    </div>
  );
}