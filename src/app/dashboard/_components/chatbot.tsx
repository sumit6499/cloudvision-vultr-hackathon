import { MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
import { getChatCompletion } from "@/actions/fetch";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const ChatBot = ({
  messages,
  input,
  setInput,
  setMessages,
}: {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const res = (await getChatCompletion(userMessage)) as string;
      setMessages((prev) => [...prev, { role: "assistant", content: res }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Card className="fixed bottom-20 right-4 w-96 border border-gray-200 rounded-lg shadow-lg">
      <CardHeader className="py-3 border-b bg-primary">
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
      <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            autoFocus
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about your infrastructure..."
            className="flex-1 focus-visible:ring-primary"
          />
          <Button type="submit" size="sm" className="px-4">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
