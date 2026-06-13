import { Link } from "react-router-dom";
import { Mail, Twitter, Github } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-heading font-bold text-4xl mb-4 text-foreground">Contact Us</h1>
        <p className="text-foreground/70 mb-10 leading-relaxed">
          Have a question, found a bug, or want to share feedback about Math Quest? We would love to
          hear from you. Reach out through any of the channels below and we will get back to you as
          soon as possible.
        </p>

        <div className="space-y-4 mb-12">
          <a
            href="mailto:hello@mathquest.app"
            className="flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm">Email</p>
              <p className="text-muted-foreground text-sm">hello@mathquest.app</p>
            </div>
          </a>

          <a
            href="https://twitter.com/mathquestapp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
              <Twitter className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm">Twitter / X</p>
              <p className="text-muted-foreground text-sm">@mathquestapp</p>
            </div>
          </a>

          <a
            href="https://github.com/mathquestapp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Github className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm">GitHub</p>
              <p className="text-muted-foreground text-sm">github.com/mathquestapp</p>
            </div>
          </a>
        </div>

        <footer className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground flex gap-4 flex-wrap">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/guide" className="hover:underline">Guide</Link>
        </footer>
      </div>
    </div>
  );
}