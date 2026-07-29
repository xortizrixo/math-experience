import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PageHeader({ title }) {
  const navigate = useNavigate();
  return (
    <div
      className="sticky top-0 z-30 bg-background/90 backdrop-blur-sm border-b border-border"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-2xl mx-auto px-4 h-12 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="rounded-full -ml-2"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        {title && (
          <span className="font-heading font-bold text-lg text-foreground truncate">
            {title}
          </span>
        )}
      </div>
    </div>
  );
}