import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEVELS, generateProblem, generateChoices, calculateStars, checkNewBadges } from "@/lib/gameData";
import { base44 } from "@/api/base44Client";
import AnswerButton from "@/components/game/AnswerButton";
import ProgressBar from "@/components/game/ProgressBar";
import Timer from "@/components/game/Timer";
import ResultScreen from "@/components/game/ResultScreen";

export default function GamePlay() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const levelId = parseInt(urlParams.get("level") || "1");
  const level = LEVELS.find((l) => l.id === levelId) || LEVELS[0];

  const [phase, setPhase] = useState("playing"); // playing | result
  const [questionIndex, setQuestionIndex] = useState(0);
  const [problem, setProblem] = useState(null);
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [answerState, setAnswerState] = useState({}); // { [value]: "correct" | "wrong" | "revealed" }
  const [correct, setCorrect] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [newBadges, setNewBadges] = useState([]);
  const [stars, setStars] = useState(0);

  const nextProblem = useCallback(() => {
    const p = generateProblem(level);
    setProblem(p);
    setChoices(generateChoices(p.answer));
    setSelected(null);
    setAnswerState({});
  }, [level]);

  useEffect(() => {
    nextProblem();
  }, []);

  const handleAnswer = (value) => {
    if (selected !== null) return;
    setSelected(value);

    if (value === problem.answer) {
      setAnswerState({ [value]: "correct" });
      setCorrect((c) => c + 1);
    } else {
      setAnswerState({
        [value]: "wrong",
        [problem.answer]: "revealed",
      });
    }

    setTimeout(() => {
      if (questionIndex + 1 >= level.problems) {
        finishLevel(value === problem.answer ? correct + 1 : correct);
      } else {
        setQuestionIndex((i) => i + 1);
        nextProblem();
      }
    }, 1200);
  };

  const finishLevel = async (finalCorrect) => {
    setTimerRunning(false);
    const earnedStars = calculateStars(finalCorrect, level.problems);
    setStars(earnedStars);

    // Save progress
    const progressList = await base44.entities.GameProgress.list();
    let progress = progressList[0];

    if (!progress) {
      progress = await base44.entities.GameProgress.create({
        current_level: 1,
        total_stars: 0,
        levels_completed: [],
        badges: [],
        streak_days: 0,
        total_problems_solved: 0,
        total_correct: 0,
      });
    }

    const levelResult = {
      stars: earnedStars,
      correct: finalCorrect,
      total: level.problems,
      timeRemaining: 0,
    };

    const badges = checkNewBadges(progress, levelResult);
    setNewBadges(badges);

    const existingCompletion = (progress.levels_completed || []).find(
      (l) => l.level === levelId
    );
    let updatedLevels = [...(progress.levels_completed || [])];
    if (existingCompletion) {
      if (earnedStars > existingCompletion.stars) {
        updatedLevels = updatedLevels.map((l) =>
          l.level === levelId
            ? { ...l, stars: earnedStars, best_score: finalCorrect, completed_at: new Date().toISOString() }
            : l
        );
      }
    } else {
      updatedLevels.push({
        level: levelId,
        stars: earnedStars,
        best_score: finalCorrect,
        completed_at: new Date().toISOString(),
      });
    }

    const newMaxLevel = Math.max(
      progress.current_level || 1,
      earnedStars >= 1 ? levelId + 1 : levelId
    );

    // Calculate streak
    const today = new Date().toISOString().split("T")[0];
    const lastPlayed = progress.last_played;
    let streak = progress.streak_days || 0;
    if (lastPlayed) {
      const lastDate = new Date(lastPlayed);
      const todayDate = new Date(today);
      const diff = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
      if (diff === 1) streak += 1;
      else if (diff > 1) streak = 1;
    } else {
      streak = 1;
    }

    const totalStarsChange = existingCompletion
      ? Math.max(0, earnedStars - existingCompletion.stars)
      : earnedStars;

    await base44.entities.GameProgress.update(progress.id, {
      current_level: Math.min(newMaxLevel, 10),
      total_stars: (progress.total_stars || 0) + totalStarsChange,
      levels_completed: updatedLevels,
      badges: [...(progress.badges || []), ...badges],
      streak_days: streak,
      last_played: today,
      total_problems_solved: (progress.total_problems_solved || 0) + level.problems,
      total_correct: (progress.total_correct || 0) + finalCorrect,
    });

    setPhase("result");
  };

  const handleTimeUp = () => {
    finishLevel(correct);
  };

  const handleRetry = () => {
    setPhase("playing");
    setQuestionIndex(0);
    setCorrect(0);
    setTimerRunning(true);
    setNewBadges([]);
    nextProblem();
  };

  const handleNext = () => {
    const nextLevel = levelId + 1;
    if (nextLevel <= 10) {
      navigate(`/play?level=${nextLevel}`);
      window.location.reload();
    }
  };

  if (phase === "result") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <ResultScreen
          correct={correct}
          total={level.problems}
          stars={stars}
          newBadges={newBadges}
          onRetry={handleRetry}
          onNext={handleNext}
          onHome={() => navigate("/")}
          hasNext={levelId < 10}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-4 pb-4 flex items-center justify-between" style={{ paddingTop: "calc(1rem + env(safe-area-inset-top))" }}>
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-medium">Level {level.id}</p>
          <p className="font-heading font-bold text-sm">{level.name}</p>
        </div>
        <div className="w-10" />
      </div>

      {/* Progress & Timer */}
      <div className="px-6 space-y-3">
        <ProgressBar current={questionIndex + 1} total={level.problems} />
        {level.timeLimit > 0 && (
          <Timer seconds={level.timeLimit} onTimeUp={handleTimeUp} isRunning={timerRunning} />
        )}
      </div>

      {/* Problem */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          {problem && (
            <motion.div
              key={questionIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md"
            >
              {/* Question */}
              <div className="text-center mb-10">
                <p className="text-sm text-muted-foreground mb-2 font-medium">What is</p>
                <p className="text-5xl sm:text-6xl font-heading font-bold tracking-tight">
                  {problem.display}
                </p>
                <p className="text-4xl sm:text-5xl font-heading font-bold text-primary mt-1">= ?</p>
              </div>

              {/* Answer Choices */}
              <div className="grid grid-cols-2 gap-3">
                {choices.map((c) => (
                  <AnswerButton
                    key={c}
                    value={c}
                    onClick={handleAnswer}
                    state={answerState[c] || null}
                    disabled={selected !== null}
                  />
                ))}
              </div>

              {/* Score */}
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Score: <span className="font-bold text-foreground">{correct}/{questionIndex + (selected !== null ? 1 : 0)}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}