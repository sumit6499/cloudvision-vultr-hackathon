"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,  } from "@/components/ui/dialog"
import { Cloud, Database, Server,  Zap,  } from 'lucide-react'
import { Bar, BarChart,  ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const costData = [
  { name: "Jan", database: 300, server: 400, network: 200 },
  { name: "Feb", database: 400, server: 300, network: 250 },
  { name: "Mar", database: 350, server: 450, network: 220 },
  { name: "Apr", database: 500, server: 400, network: 300 },
  { name: "May", database: 450, server: 550, network: 320 },
  { name: "Jun", database: 400, server: 500, network: 280 },
]

const infrastructureItems = [
  {
    name: 'Main Database',
    type: 'Database',
    region: 'us-east-1',
    replicas: 3,
    availabilityZones: ['us-east-1a', 'us-east-1b', 'us-east-1c'],
    status: 'Healthy'
  },
  {
    name: 'Web Server Cluster',
    type: 'Server',
    region: 'us-west-2',
    instances: 5,
    availabilityZones: ['us-west-2a', 'us-west-2b'],
    status: 'Running'
  },
  {
    name: 'Analytics Database',
    type: 'Database',
    region: 'eu-central-1',
    replicas: 2,
    availabilityZones: ['eu-central-1a', 'eu-central-1b'],
    status: 'Healthy'
  },
]

export default function AdvancedDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false)

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
          <Button onClick={() => setIsAIDialogOpen(true)}>
            <Zap className="mr-2 h-4 w-4" />
            Get AI Insights
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>Overview</TabsTrigger>
            <TabsTrigger value="databases" onClick={() => setActiveTab("databases")}>Databases</TabsTrigger>
            <TabsTrigger value="servers" onClick={() => setActiveTab("servers")}>Servers</TabsTrigger>
            <TabsTrigger value="costs" onClick={() => setActiveTab("costs")}>Costs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infrastructureItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {item.name}
                    </CardTitle>
                    <Badge variant={item.status === 'Healthy' || item.status === 'Running' ? 'default' : 'destructive'}>
                      {item.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      {item.type === 'Database' ? <Database className="h-4 w-4" /> : <Server className="h-4 w-4" />}
                      <span>{item.type}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Region:</span>
                        <span className="font-medium">{item.region}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.type === 'Database' ? 'Replicas:' : 'Instances:'}</span>
                        <span className="font-medium">{item.replicas || item.instances}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Availability Zones:</span>
                        <span className="font-medium">{item.availabilityZones.join(', ')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="databases">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {infrastructureItems.filter(item => item.type === 'Database').map((db, index) => (
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
          </TabsContent>
          
          <TabsContent value="servers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {infrastructureItems.filter(item => item.type === 'Server').map((server, index) => (
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
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-gray-600">
        © 2024 CloudVision. All rights reserved.
      </footer>

      <AIInsights />
    </div>
  )
}