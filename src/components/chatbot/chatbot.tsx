import {  useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Message = {
  role: 'user' | 'bot'
  content: string
  options?: string[]
}


export default function Chatbot() {


  

  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: 'Hello! How can I assist you today?', 
      options: ['Product Information', 'Order Status', 'Customer Support']
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = (message: string) => {
    
    if (message.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: message }])
      
      
      
      setInput('')
    }
  }

  return (
    <Card className="w-full h-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Chatbot</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex items-end ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{message.role === 'user' ? 'U' : 'B'}</AvatarFallback>
                </Avatar>
                <div className={`mx-2 py-2 px-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}

          {/* btns with response */}
          {messages[messages.length - 1].role === 'bot' && messages[messages.length - 1].options && (
            <div className="flex flex-wrap justify-start gap-2 mt-2">
              { messages[messages.length - 1].options?.map((option, index) => (
                <Button key={index} variant="outline" onClick={() => handleSend(option)}>
                  {option}
                </Button>
              ))}
            </div>
          )}

        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
          />
          <Button onClick={() => handleSend(input)}>Send</Button>
        </div>
      </CardFooter>
    </Card>
  )
}