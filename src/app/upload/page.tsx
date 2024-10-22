'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Upload } from 'lucide-react'
import {useState} from 'react'

function Page() {
    const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('File uploaded:', file)
  }

  return (
    <div>
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">Upload Your Infrastructure Image</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label htmlFor="infrastructure-image" className="block text-blue-700 mb-2">
              Infrastructure Image
            </Label>
            <Input
              id="infrastructure-image"
              type="file"
              accept="image/*"
              className="border-2 border-dashed border-blue-300 rounded-lg p-5 w-full text-blue-600 file:mr-4 file:px-4  file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleFileChange}
            />
          </div>
          <Button type="submit" className="w-full" disabled={!file}>
            <Upload className="mr-2 h-4 w-4" /> Upload and Generate Infrastructure
          </Button>
        </form>
      </main>
    </div>
  )
}

export default Page
