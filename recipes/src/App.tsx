import { useState } from 'react'
import axios from 'axios'
import { DishList } from './components/DishList'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState<string>('') //Get user prompt
  const [dishes, setDishes] = useState<any[]>([]) //Get the dishes based on user prompt
  const [loading, setLoading] = useState(false) //Loading state
  const [error, setError] = useState<string | null>(null) //Error state

  const fetchDishes = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php', {
        params: {
          s: prompt,
        },
      })
      const data = response.data
      if (data.meals) {
        setDishes(data.meals)
      } else {
        setDishes([])
        setError('No dishes found')
      }
    } catch (err) {
      setError('Error fetching dishes')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='dishes'>
      <h1>Dishes Finder</h1>
      <input
        type='text'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='Enter a dish name'
      />
      <button onClick={fetchDishes} disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>
      {error && <p className='error'>{error}</p>}
      <DishList dishes={dishes}/>
    </div>
  )
}

export default App
