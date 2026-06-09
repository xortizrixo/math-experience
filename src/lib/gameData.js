export const LEVELS = [
  {
    id: 1,
    name: "Number Buddies",
    description: "Simple addition up to 10",
    operation: "add",
    emoji: "🌟",
    color: "from-violet-400 to-purple-500",
    maxNum: 10,
    problems: 5,
    timeLimit: 0,
  },
  {
    id: 2,
    name: "Plus Power",
    description: "Addition up to 20",
    operation: "add",
    emoji: "⚡",
    color: "from-blue-400 to-cyan-500",
    maxNum: 20,
    problems: 6,
    timeLimit: 0,
  },
  {
    id: 3,
    name: "Take Away Trail",
    description: "Subtraction up to 10",
    operation: "subtract",
    emoji: "🌈",
    color: "from-pink-400 to-rose-500",
    maxNum: 10,
    problems: 5,
    timeLimit: 0,
  },
  {
    id: 4,
    name: "Minus Mountain",
    description: "Subtraction up to 20",
    operation: "subtract",
    emoji: "🏔️",
    color: "from-emerald-400 to-teal-500",
    maxNum: 20,
    problems: 6,
    timeLimit: 30,
  },
  {
    id: 5,
    name: "Mix Master",
    description: "Addition & subtraction up to 20",
    operation: "mixed_add_sub",
    emoji: "🎨",
    color: "from-amber-400 to-orange-500",
    maxNum: 20,
    problems: 7,
    timeLimit: 45,
  },
  {
    id: 6,
    name: "Times Tables",
    description: "Multiply by 2, 3, and 5",
    operation: "multiply",
    emoji: "✖️",
    color: "from-indigo-400 to-blue-600",
    maxNum: 5,
    problems: 6,
    timeLimit: 40,
  },
  {
    id: 7,
    name: "Multiply Mania",
    description: "Multiply up to 10×10",
    operation: "multiply",
    emoji: "🚀",
    color: "from-fuchsia-400 to-purple-600",
    maxNum: 10,
    problems: 8,
    timeLimit: 50,
  },
  {
    id: 8,
    name: "Division Dash",
    description: "Simple division",
    operation: "divide",
    emoji: "➗",
    color: "from-lime-400 to-green-500",
    maxNum: 10,
    problems: 6,
    timeLimit: 45,
  },
  {
    id: 9,
    name: "Math Wizard",
    description: "All operations mixed!",
    operation: "all",
    emoji: "🧙",
    color: "from-yellow-400 to-red-500",
    maxNum: 12,
    problems: 10,
    timeLimit: 60,
  },
  {
    id: 10,
    name: "Grand Champion",
    description: "The ultimate challenge!",
    operation: "all",
    emoji: "🏆",
    color: "from-yellow-300 to-amber-600",
    maxNum: 20,
    problems: 12,
    timeLimit: 90,
  },
];

export const BADGES = [
  { id: "first_star", name: "First Star", emoji: "⭐", description: "Earn your first star" },
  { id: "perfect_score", name: "Perfect Score", emoji: "💯", description: "Get all answers right in a level" },
  { id: "speed_demon", name: "Speed Demon", emoji: "⚡", description: "Complete a timed level with time to spare" },
  { id: "five_levels", name: "Explorer", emoji: "🗺️", description: "Complete 5 levels" },
  { id: "all_levels", name: "Math Master", emoji: "🧠", description: "Complete all levels" },
  { id: "streak_3", name: "On Fire", emoji: "🔥", description: "Play 3 days in a row" },
  { id: "fifty_problems", name: "Problem Crusher", emoji: "💪", description: "Solve 50 problems" },
  { id: "hundred_stars", name: "Star Collector", emoji: "🌟", description: "Collect 100 stars" },
];

export function generateProblem(level) {
  const { operation, maxNum } = level;
  let a, b, answer, op;

  const ops = operation === "mixed_add_sub" ? ["add", "subtract"]
    : operation === "all" ? ["add", "subtract", "multiply", "divide"]
    : [operation];

  op = ops[Math.floor(Math.random() * ops.length)];

  switch (op) {
    case "add":
      a = Math.floor(Math.random() * maxNum) + 1;
      b = Math.floor(Math.random() * maxNum) + 1;
      answer = a + b;
      return { a, b, answer, symbol: "+", display: `${a} + ${b}` };

    case "subtract":
      a = Math.floor(Math.random() * maxNum) + 1;
      b = Math.floor(Math.random() * a) + 1;
      answer = a - b;
      return { a, b, answer, symbol: "−", display: `${a} − ${b}` };

    case "multiply":
      a = Math.floor(Math.random() * maxNum) + 1;
      b = Math.floor(Math.random() * maxNum) + 1;
      answer = a * b;
      return { a, b, answer, symbol: "×", display: `${a} × ${b}` };

    case "divide":
      b = Math.floor(Math.random() * maxNum) + 1;
      answer = Math.floor(Math.random() * maxNum) + 1;
      a = b * answer;
      return { a, b, answer, symbol: "÷", display: `${a} ÷ ${b}` };

    default:
      a = Math.floor(Math.random() * maxNum) + 1;
      b = Math.floor(Math.random() * maxNum) + 1;
      answer = a + b;
      return { a, b, answer, symbol: "+", display: `${a} + ${b}` };
  }
}

export function generateChoices(correctAnswer) {
  const choices = new Set([correctAnswer]);
  while (choices.size < 4) {
    const offset = Math.floor(Math.random() * 10) - 5;
    const wrong = correctAnswer + offset;
    if (wrong !== correctAnswer && wrong >= 0) {
      choices.add(wrong);
    }
  }
  return Array.from(choices).sort(() => Math.random() - 0.5);
}

export function calculateStars(correct, total) {
  const pct = correct / total;
  if (pct >= 0.95) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}

export function checkNewBadges(progress, levelResult) {
  const newBadges = [];
  const existing = progress.badges || [];

  if (!existing.includes("first_star") && (progress.total_stars || 0) + levelResult.stars > 0) {
    newBadges.push("first_star");
  }
  if (!existing.includes("perfect_score") && levelResult.correct === levelResult.total) {
    newBadges.push("perfect_score");
  }
  if (!existing.includes("speed_demon") && levelResult.timeRemaining > 5) {
    newBadges.push("speed_demon");
  }
  const completedCount = (progress.levels_completed || []).length + 1;
  if (!existing.includes("five_levels") && completedCount >= 5) {
    newBadges.push("five_levels");
  }
  if (!existing.includes("all_levels") && completedCount >= 10) {
    newBadges.push("all_levels");
  }
  if (!existing.includes("streak_3") && (progress.streak_days || 0) >= 3) {
    newBadges.push("streak_3");
  }
  const totalProblems = (progress.total_problems_solved || 0) + levelResult.total;
  if (!existing.includes("fifty_problems") && totalProblems >= 50) {
    newBadges.push("fifty_problems");
  }
  const totalStars = (progress.total_stars || 0) + levelResult.stars;
  if (!existing.includes("hundred_stars") && totalStars >= 100) {
    newBadges.push("hundred_stars");
  }

  return newBadges;
}