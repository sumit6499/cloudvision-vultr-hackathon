import { MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { Markdown } from "@/components/markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const ChatBot = ({ diagramId }: { diagramId: string }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: {
      diagramId: diagramId ||localStorage.getItem("diagramID") || "fd8ad278-06fb-4576-a9e8-f190f9e61eca",
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <Card className="fixed bottom-20 right-4 w-[400px] border border-[#222222] bg-[#111111] rounded-xl shadow-2xl">
      <CardHeader className="py-3 border-b border-[#222222] bg-primary/90 backdrop-blur-sm">
        <CardTitle className="text-sm font-semibold text-primary-foreground flex items-center">
          <MessageCircle className="h-4 w-4 mr-2 animate-pulse" />
          Infrastructure Assistant
        </CardTitle>
      </CardHeader>
      <div className="h-[450px] px-4 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#222222] scrollbar-track-transparent">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`mb-4 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-[85%] shadow-md transition-all duration-200 ${
                message.role === "user"
                  ? "bg-blue-600 text-white ml-4 hover:bg-blue-700"
                  : "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 mr-4"
              }`}
            >
              <Markdown>{message.content}</Markdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#222222] rounded-2xl px-4 py-2 max-w-[85%] mr-4 animate-pulse">
              <div className="h-4 w-20 rounded bg-[#333333]" />
              <div className="h-4 w-40 rounded bg-[#333333] mt-2" />
              <div className="h-4 w-32 rounded bg-[#333333] mt-2" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#222222] bg-background/50 backdrop-blur-sm">
        <div className="flex gap-3">
          <Input
            autoFocus
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about your infrastructure..."
            className="flex-1 focus-visible:ring-primary/50 bg-black text-white border-[#333333] placeholder:text-muted-foreground/50"
          />
          <Button 
            type="submit" 
            size="sm"
            disabled={isLoading}
            className="px-4 hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
