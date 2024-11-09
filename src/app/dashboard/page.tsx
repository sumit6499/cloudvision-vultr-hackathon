"use client"

import {  useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,  } from "@/components/ui/dialog"
import {  Database, MessageCircle, Server,  Zap,  } from 'lucide-react'
import { Bar, BarChart,  ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Input } from "@/components/ui/input"
import { getChatCompletion } from '@/actions/fetch'

const costData = [
  { name: "Jan", database: 300, server: 400, network: 200 },
  { name: "Feb", database: 400, server: 300, network: 250 },
  { name: "Mar", database: 350, server: 450, network: 220 },
  { name: "Apr", database: 500, server: 400, network: 300 },
  { name: "May", database: 450, server: 550, network: 320 },
  { name: "Jun", database: 400, server: 500, network: 280 },
]

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const ChatBot = ({
  messages,
  input,
  setInput,
  setMessages
}: {
  messages: Message[]
  input: string
  setInput: (value: string) => void
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      const res = await getChatCompletion(userMessage) as string
      setMessages(prev => [...prev, { role: 'assistant', content: res }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

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
            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-[85%] shadow-sm ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground ml-4'
                  : 'bg-muted mr-4'
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
  )
}

// Add this type definition for the API response
type InfrastructureData = {
  success: boolean;
  msg: string;
  data: {
    blockStorage: {
      blocks: any[];
      meta: { total: number; links: { next: string; prev: string } };
    };
    instances: {
      instances: any[];
      meta: { total: number; links: { next: string; prev: string } };
    };
    db: {
      databases: any[];
      meta: { total: number };
    };
  };
};

export default function AdvancedDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false)
  const [isChatbotOpen,setisChatbotOpen]=useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [infrastructureData, setInfrastructureData] = useState<InfrastructureData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/infra/all`);
      const data = await res.json();
      console.log(data)
      setInfrastructureData(data);
    } catch (error) {
      console.error('Failed to fetch infrastructure data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper function to get total counts
  const getTotalCounts = () => ({
    storage: infrastructureData?.data.blockStorage.meta.total || 0,
    instances: infrastructureData?.data.instances.meta.total || 0,
    databases: infrastructureData?.data.db.meta.total || 0,
  });

  // Replace the static overview content with this
  const renderOverviewContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-500">Loading infrastructure data...</div>;
    }

    const totals = getTotalCounts();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Block Storage</CardTitle>
            <Badge className="bg-blue-100 text-blue-800">{totals.storage} blocks</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
              <Database className="h-4 w-4 text-blue-500" />
              <span>Storage Resources</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Instances</CardTitle>
            <Badge className="bg-green-100 text-green-800">{totals.instances} instances</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
              <Server className="h-4 w-4 text-green-500" />
              <span>Compute Resources</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Databases</CardTitle>
            <Badge className="bg-purple-100 text-purple-800">{totals.databases} databases</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
              <Database className="h-4 w-4 text-purple-500" />
              <span>Database Resources</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Add these helper functions to transform API data into the required format
  const getDatabaseItems = () => {
    return infrastructureData?.data.db.databases.map(db => ({
      name: db.name,
      type: 'Database',
      region: db.region,
      replicas: db.replicas || 1,
      availabilityZones: db.availability_zones || [],
      status: db.status
    })) || [];
  };

  const getServerItems = () => {
    return infrastructureData?.data.instances.instances.map(server => ({
      name: server.name,
      type: 'Server',
      region: server.region,
      instances: server.count || 1,
      availabilityZones: server.availability_zones || [],
      status: server.status
    })) || [];
  };

  // Update the database content rendering
  const renderDatabaseContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-500">Loading database data...</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getDatabaseItems().map((db, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{db.name}</CardTitle>
              <CardDescription>Region: {db.region}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Replicas:</span>
                  <span className="font-medium">{db.replicas}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Availability Zones:</span>
                  <span className="font-medium">{db.availabilityZones.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <Badge variant={db.status === 'Healthy' ? 'default' : 'destructive'}>
                    {db.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  // Update the servers content rendering
  const renderServersContent = () => {
    if (isLoading) {
      return <div className="text-center text-gray-500">Loading server data...</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getServerItems().map((server, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{server.name}</CardTitle>
              <CardDescription>Region: {server.region}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Instances:</span>
                  <span className="font-medium">{server.instances}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Availability Zones:</span>
                  <span className="font-medium">{server.availabilityZones.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <Badge variant={server.status === 'Running' ? 'default' : 'destructive'}>
                    {server.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const AIInsights = () => (
    <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Insights and Suggestions</DialogTitle>
          <DialogDescription>
            Based on your current infrastructure and usage patterns, here are some insights and suggestions:
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc list-inside space-y-2">
          <li>Consider scaling up the Web Server Cluster in us-west-2 to handle increased traffic.</li>
          <li>The Main Database in us-east-1 has consistent high usage. Evaluate if you need to upgrade to a larger instance type.</li>
          <li>Your Analytics Database in eu-central-1 has low utilization. Consider downsizing to reduce costs.</li>
          <li>Implement cross-region replication for the Main Database to improve global performance and disaster recovery capabilities.</li>
        </ul>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Infrastructure Dashboard</h1>
          <Button onClick={() => setIsAIDialogOpen(true)} className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
            <Zap className="mr-2 h-4 w-4" />
            Get AI Insights
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex space-x-4">
            <TabsTrigger value="overview" onClick={() => setActiveTab("overview")} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-300">Overview</TabsTrigger>
            <TabsTrigger value="databases" onClick={() => setActiveTab("databases")} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-300">Databases</TabsTrigger>
            <TabsTrigger value="servers" onClick={() => setActiveTab("servers")} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-300">Servers</TabsTrigger>
            <TabsTrigger value="costs" onClick={() => setActiveTab("costs")} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-300">Costs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            {renderOverviewContent()}
          </TabsContent>
          
          <TabsContent value="databases">
            {renderDatabaseContent()}
          </TabsContent>
          
          <TabsContent value="servers">
            {renderServersContent()}
          </TabsContent>
          
          <TabsContent value="costs">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Infrastructure Costs</CardTitle>
                <CardDescription>Breakdown of costs by infrastructure type</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="database" stackId="a" fill="#3b82f6" name="Database" />
                    <Bar dataKey="server" stackId="a" fill="#10b981" name="Server" />
                    <Bar dataKey="network" stackId="a" fill="#f59e0b" name="Network" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="chatbot">
          {isChatbotOpen && (
            <ChatBot 
              messages={messages}
              input={input}
              setInput={setInput}
              setMessages={setMessages}
            />
          )}
          <Button 
            onClick={() => setisChatbotOpen((prev) => !prev)}
            className="fixed bottom-4 right-4 w-12 h-12 rounded-full p-0 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
          >
            <MessageCircle className='h-6 w-6'/>
          </Button>
        </div>
                
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-gray-600">
        © 2024 CloudVision. All rights reserved.
      </footer>

      <AIInsights />
    </div>
  )
}