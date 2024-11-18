import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface HeaderProps {
  onAIInsightsClick: () => void;
}

export const Header = ({ onAIInsightsClick }: HeaderProps) => {
  return (
    <div className="flex sm:justify-between flex-col sm:flex-row md:items-center items-start gap-4 md:gap-6 mb-4 md:mb-6 p-3 border border-[#222222] bg-[#181818] rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold">
        Infrastructure Dashboard
      </h1>
      <Button
        onClick={onAIInsightsClick}
        className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 flex items-center justify-center transition-colors duration-300 gap-2"
      >
        <Zap className="h-4 w-4" />
        Get AI Insights
      </Button>
    </div>
  );
};
