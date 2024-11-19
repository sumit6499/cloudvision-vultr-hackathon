import { Markdown } from "@/components/markdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export const AIInsights = ({
  isAIDialogOpen,
  setIsAIDialogOpen,
}: {
  isAIDialogOpen: boolean;
  setIsAIDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [diagramId, setDiagramId] = useState<string>("fd8ad278-06fb-4576-a9e8-f190f9e61eca");

  useEffect(() => {
    const storedDiagramId = localStorage.getItem("diagramID");
    if (storedDiagramId) {
      setDiagramId(storedDiagramId);
      const storedInsights = localStorage.getItem(`insights-${storedDiagramId}`);
      if (storedInsights) {
        setContent(storedInsights);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!isAIDialogOpen) {
      setLoading(true);
      setContent("");
      return;
    }

    const fetchInsights = async () => {
      const storedInsights = localStorage.getItem(`insights-${diagramId}`);
      if (storedInsights) {
        setContent(storedInsights);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch("/api/ai-insights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ diagramId }),
        });

        if (!response.ok) throw new Error('Failed to fetch insights');
        
        const data = await response.json();
        setContent(data.content);
        localStorage.setItem(`insights-${diagramId}`, data.content);
      } catch (error) {
        console.error('Error fetching insights:', error);
        setContent("Failed to load insights. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [isAIDialogOpen, diagramId]);

  return (
    <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Insights and Suggestions</DialogTitle>
          <DialogDescription>
            Based on your current infrastructure and usage patterns, here are
            some insights and suggestions:
          </DialogDescription>
        </DialogHeader>
        <div className="text-[#656565] space-y-2">
          {loading ? (
            <div className="text-center w-full mt-4 h-10">Loading...</div>
          ) : (
            <Markdown>{content}</Markdown>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
