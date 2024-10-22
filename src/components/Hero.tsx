import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowRight,  CloudCog, Key, Zap } from 'lucide-react'

function Hero() {
  return (
    <main className='main_home_hero container mx-auto px-4 py-16'>
      <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">Turn Your Vision into Cloud Reality</h1>
          <p className="text-xl text-blue-700 mb-8">Upload an image of your cloud infrastructure and {"we'll"} bring it to life on Vultr Cloud.</p>
          <Button asChild size="lg">
            <Link href="/upload" className="flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CloudCog className='h-12 w-12 text-blue-600 mb-4'/>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Upload Infrastructure Image</h2>
            <p className="text-blue-700">Simply upload an image of your desired cloud infrastructure setup.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Zap className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Automatic Generation</h2>
            <p className="text-blue-700">Our AI analyzes your image and creates the corresponding infrastructure on Vultr Cloud.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Key className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Secure Access</h2>
            <p className="text-blue-700">Access your infrastructure securely using API keys or SSH keys.</p>
          </div>
        </div>
    </main>
  )
}

export default Hero
