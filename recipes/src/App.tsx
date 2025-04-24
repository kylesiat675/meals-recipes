import { useState } from 'react'
import axios from 'axios'
import { DishList } from './components/DishList'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState<string>('') //Get user prompt
  const [dishes, setDishes] = useState<any[]>([]) //Get the dishes based on user prompt
  const [loading, setLoading] = useState(false) //Loading state
  const [error, setError] = useState<string | null>(null) //Error state

  return (
    <div className='dishes'>

    </div>
  )
}

export default App
