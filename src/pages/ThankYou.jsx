import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Thank You" />
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
        >
          <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
        </motion.div>
        <h1 className="font-heading font-bold text-3xl mb-3">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">
          All levels are now unlocked. Head back to start your next Math Quest adventure!
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-primary-foreground font-heading font-bold px-8 py-3 rounded-2xl hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}