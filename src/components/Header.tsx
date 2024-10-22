import {Cloud} from 'lucide-react'
import Link from 'next/link'

function Header() {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center bg-gradient-to-b from-blue-50 ">
        <div className="flex items-center space-x-2">
          <Cloud className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-blue-900">CloudVision</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/upload" className="text-blue-600 hover:text-blue-800">Upload</Link></li>
            <li><Link href="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</Link></li>
            <li><Link href="/settings" className="text-blue-600 hover:text-blue-800">Settings</Link></li>
          </ul>
        </nav>
      </header>
  )
}

export default Header
