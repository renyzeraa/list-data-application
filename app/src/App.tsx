import { Plus } from 'lucide-react'

export function App() {
  return (
    <div className="py-10 space-y-8">
      <div>
        header 
        tabs
      </div>
      <main className="max-w-6xl space-y-5 nx-auto">
        <h1 className="text-xl font-bold">Tags</h1>
        <button className='inline-flex items-center gap-1.5 '>
          <Plus className='size-3'></Plus>
          Create new
        </button>
      </main>
  </div>  
  )
}
