"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";
import {
  Header,
  Overview,
  ChatBot,
  AIInsights,
  renderDatabaseContent,
  renderServersContent,
  Cost,
  renderBlockContent,
} from "./_components";
import { BlockStorageItem, InfrastructureData, Message } from "./_components/types";

const costData = [
  { name: "Jan", database: 300, server: 400, network: 200 },
  { name: "Feb", database: 400, server: 300, network: 250 },
  { name: "Mar", database: 350, server: 450, network: 220 },
  { name: "Apr", database: 500, server: 400, network: 300 },
  { name: "May", database: 450, server: 550, network: 320 },
  { name: "Jun", database: 400, server: 500, network: 280 },
];

export default function AdvancedDashboard() {
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [isChatbotOpen, setisChatbotOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [infrastructureData, setInfrastructureData] =
    useState<InfrastructureData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/infra/all`);
      const data = await res.json();
      console.log(data);
      setInfrastructureData(data);
    } catch (error) {
      console.error("Failed to fetch infrastructure data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add these helper functions to transform API data into the required format
  const getDatabaseItems = () => {
    return (
      infrastructureData?.data.db.databases.map((db) => ({
        name: db.dbname,
        type: "Database",
        region: db.region,
        replicas: db.read_replicas?.length || 0,
        databaseEngine: db.database_engine,
        status: db.status,
        password: db.password,
        user: db.user,
        port: db.port,
      })) || []
    );
  };

  const getServerItems = () => {
    return (
      infrastructureData?.data.instances.instances.map((server) => ({
        name: server.hostname,
        type: "Server",
        region: server.region,
        instances: server.vcpu_count || 0,
        ip: server.main_ip,
        status: server.status,
      })) || []
    );
  };

  const getBlockStorages = () => {
    return infrastructureData?.data.blockStorage.blocks.map((block) => ({
      id: block.id,
      name: block.block_type,
      size: block.size_gb,
      status: block.status,
      cost: block.cost,
    })) as BlockStorageItem[];
  };

  return (
    <div className="h-full">
      <main className="container mx-auto py-8">
        <Header onAIInsightsClick={() => setIsAIDialogOpen(true)} />
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex md:space-x-4 md:justify-start justify-between bg-transparent border border-[#222222]">
            <TabsTrigger
              value="overview"
              className="md:px-4 px-3 rounded transition-colors duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="databases"
              className="md:px-4 px-3 rounded transition-colors duration-300"
            >
              Databases
            </TabsTrigger>
            <TabsTrigger
              value="servers"
              className="md:px-4 px-3 rounded transition-colors duration-300"
            >
              Servers
            </TabsTrigger>
            <TabsTrigger
              value="block"
              className="md:px-4 px-3 rounded transition-colors duration-300"
            >
              Block Storage
            </TabsTrigger>
            <TabsTrigger
              value="costs"
              className="md:px-4 px-3 rounded transition-colors duration-300"
            >
              Costs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Overview
              isLoading={isLoading}
              infrastructureData={infrastructureData}
            />
          </TabsContent>
          <TabsContent value="databases">
            {renderDatabaseContent({ isLoading, getDatabaseItems })}
          </TabsContent>
          <TabsContent value="servers">
            {renderServersContent(isLoading, getServerItems)}
          </TabsContent>
          <TabsContent value="block">
            {renderBlockContent({ isLoading, getBlockStorages })}
          </TabsContent>
          <TabsContent value="costs">
            <Cost costData={costData} />
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
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </main>
      <AIInsights
        isAIDialogOpen={isAIDialogOpen}
        setIsAIDialogOpen={setIsAIDialogOpen}
      />
    </div>
  );
}
