import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function AnswerButton({ value, onClick, state, disabled }) {
  // state: null | "correct" | "wrong" | "revealed"
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.06 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={() => !disabled && onClick(value)}
      disabled={disabled}
      className={cn(
        "relative w-full py-5 px-6 rounded-2xl text-2xl font-heading font-bold",
        "border-2 transition-colors duration-200 shadow-md",
        state === "correct" && "bg-emerald-100 border-emerald-400 text-emerald-700",
        state === "wrong" && "bg-red-100 border-red-400 text-red-700 animate-wiggle",
        state === "revealed" && "bg-emerald-50 border-emerald-300 text-emerald-600 opacity-60",
        !state && !disabled && "bg-card border-border hover:border-primary hover:shadow-lg text-foreground",
        !state && disabled && "bg-muted border-muted text-muted-foreground opacity-50"
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {state === "correct" && <Check className="w-6 h-6" />}
        {state === "wrong" && <X className="w-6 h-6" />}
        <span>{value}</span>
      </div>
    </motion.button>
  );
}