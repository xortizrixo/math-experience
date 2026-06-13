import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-heading font-bold text-4xl mb-6 text-foreground">About Math Quest</h1>

        <p className="text-foreground/80 leading-relaxed mb-4">
          Math Quest is a free, interactive math learning game designed specifically for kids aged 5–12.
          Our mission is simple: make practicing arithmetic genuinely fun so that children build strong
          number skills without even realizing they are learning.
        </p>

        <p className="text-foreground/80 leading-relaxed mb-4">
          The app covers the four core operations — addition, subtraction, multiplication, and division —
          organized across ten progressive levels. Each level introduces slightly harder numbers and
          shorter time limits, so learners are always gently challenged rather than overwhelmed. After
          finishing a level, kids earn up to three stars and unlock special badges that celebrate
          milestones like a perfect score, a five-day practice streak, or completing all ten levels.
        </p>

        <p className="text-foreground/80 leading-relaxed mb-4">
          Math Quest is built with parents and teachers in mind. Progress is automatically saved, so
          children can pick up exactly where they left off on any device. The stats dashboard gives a
          clear picture of accuracy, problems solved, and current streaks, helping adults spot areas
          where a student might need extra support.
        </p>

        <p className="text-foreground/80 leading-relaxed mb-4">
          The app was created by a small team passionate about early-childhood education and thoughtful
          game design. We believe that the best learning happens through play, positive reinforcement,
          and a sense of real achievement — not rote repetition. Every design decision, from the
          colorful level cards to the confetti celebrations, is made with that philosophy in mind.
        </p>

        <p className="text-foreground/80 leading-relaxed mb-8">
          Math Quest is free to play. We are constantly adding new levels, operations, and challenge
          modes based on feedback from students, parents, and educators around the world. If you have
          ideas or questions, we would love to hear from you.
        </p>

        <div className="flex gap-4 flex-wrap">
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground font-heading font-bold px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity"
          >
            Contact Us
          </Link>
          <Link
            to="/guide"
            className="inline-block bg-muted text-foreground font-heading font-bold px-6 py-3 rounded-2xl hover:opacity-80 transition-opacity"
          >
            How to Play
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