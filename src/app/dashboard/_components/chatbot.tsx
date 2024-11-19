import { MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
import { getChatCompletion } from "@/actions/fetch";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const ChatBot = ({ diagramId }: { diagramId: string }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      diagramId: diagramId,
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <Card className="fixed bottom-20 right-4 w-96 border border-[#222222] bg-[#111111] rounded-lg shadow-lg">
      <CardHeader className="py-3 border-b border-[#222222] bg-primary">
        <CardTitle className="text-sm font-semibold text-primary-foreground flex items-center">
          <MessageCircle className="h-4 w-4 mr-2" />
          Infrastructure Assistant
        </CardTitle>
      </CardHeader>
      <div className="h-[380px] px-4 py-4 overflow-y-auto">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`mb-4 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-[85%] shadow-sm ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-4"
                  : "bg-muted mr-4"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#222222] bg-background">
        <div className="flex gap-2">
          <Input
            autoFocus
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about your infrastructure..."
            className="flex-1 focus-visible:ring-[#222222]"
          />
          <Button type="submit" size="sm" className="px-4">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
