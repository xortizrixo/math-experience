import { Link } from "react-router-dom";

export default function Guide() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-heading font-bold text-4xl mb-6 text-foreground">
          How to Play Math Quest — A Complete Guide for Kids and Parents
        </h1>

        <p className="text-foreground/80 leading-relaxed mb-4">
          Math Quest is a level-based math game that helps children practice arithmetic in a fun,
          rewarding environment. This guide explains everything you need to know to get started,
          understand the scoring system, and make the most of the app's learning features.
        </p>

        <h2 className="font-heading font-bold text-2xl mt-8 mb-3 text-foreground">Getting Started</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          After logging in, you land on the Levels screen. Ten levels are available, each unlocked by
          earning at least one star on the previous level. Level 1 starts with simple single-digit
          addition, perfect for beginners. As you progress, the numbers get larger, new operations
          are introduced, and time limits become tighter — keeping experienced players engaged.
        </p>

        <h2 className="font-heading font-bold text-2xl mt-8 mb-3 text-foreground">Answering Questions</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Each level presents a series of multiple-choice math problems. Tap or click the correct
          answer from the four options shown. A green highlight means you got it right; red means
          incorrect and the correct answer is revealed so you can learn from the mistake. There is no
          penalty for wrong answers — just keep going and aim for a higher score next time.
        </p>

        <h2 className="font-heading font-bold text-2xl mt-8 mb-3 text-foreground">Stars and Scoring</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Your star rating at the end of a level depends on how many questions you answered correctly.
          Getting all questions right earns three stars — a perfect score. Two stars is awarded for a
          strong performance, and one star means you passed. Any star count unlocks the next level.
          You can replay any completed level to improve your star rating; your personal best is always
          saved.
        </p>

        <h2 className="font-heading font-bold text-2xl mt-8 mb-3 text-foreground">Badges and Streaks</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Badges are special achievements awarded for reaching milestones. Examples include earning a
          perfect score, completing five levels in a row, or playing every day for a week. A daily
          streak counter tracks consecutive days of play — a great habit-forming tool for young
          learners. Check the Badges tab to see which ones you have earned and which are still locked.
        </p>

        <h2 className="font-heading font-bold text-2xl mt-8 mb-3 text-foreground">Tips for Parents and Teachers</h2>
        <p className="text-foreground/80 leading-relaxed mb-8">
          Math Quest works best as a short daily practice session of 5–10 minutes rather than long
          marathon sessions. The Stats tab gives a detailed breakdown of accuracy and total problems
          solved, which can help identify specific areas — such as multiplication or division — that
          need more attention. The streak feature encourages children to return each day, reinforcing
          the habit of regular practice that is key to long-term math fluency.
        </p>

        <div className="flex gap-4 flex-wrap">
          <Link
            to="/register"
            className="inline-block bg-primary text-primary-foreground font-heading font-bold px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity"
          >
            Start Playing Free
          </Link>
          <Link
            to="/about"
            className="inline-block bg-muted text-foreground font-heading font-bold px-6 py-3 rounded-2xl hover:opacity-80 transition-opacity"
          >
            About Math Quest
          </Link>
        </div>

        <footer className="mt-16 pt-6 border-t border-border text-xs text-muted-foreground flex gap-4 flex-wrap">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/guide" className="hover:underline">Guide</Link>
        </footer>
      </div>
    </div>
  );
}