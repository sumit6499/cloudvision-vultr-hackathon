import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  Server, Database, Network } from 'lucide-react'
import { Button } from '@/components/ui/button'

const page = () => {
    const infrastructureItems = [
        { name: 'Web Server', type: 'Server', status: 'Running' },
        { name: 'Database', type: 'Database', status: 'Running' },
        { name: 'Load Balancer', type: 'Network', status: 'Running' },
    ]
  return (
    <div>
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">Your Infrastructure</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infrastructureItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {item.type === 'Server' && <Server className="mr-2 h-4 w-4" />}
                  {item.type === 'Database' && <Database className="mr-2 h-4 w-4" />}
                  {item.type === 'Network' && <Network className="mr-2 h-4 w-4" />}
                  {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-600">Type: {item.type}</p>
                <p className="text-sm text-green-600">Status: {item.status}</p>
                <Button className="mt-4" size="sm">Manage</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

export default page
