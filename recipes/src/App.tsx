import { useState } from 'react'
import axios from 'axios'
import { DishList } from './components/DishList'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState<string>('') //Get user prompt
  const [dishes, setDishes] = useState<any[]>([]) //Get the dishes based on user prompt
  const [loading, setLoading] = useState(false) //Loading state
  const [error, setError] = useState<string | null>(null) //Error state

  const fetchDishes = async (e: any) => {
    e.preventDefault() //Prevents the default submission when the button is clicked
    setLoading(true) //Sets loading state to true
    setError(null) //Sets error state to null (no error)
    try{
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${prompt}`) //Fetches dishes that has the prompt in the name
      if(res.data.meals){
        setDishes(res.data.meals) //Sets the dishes state to the response data with the dishes
      }else{
        setDishes([]) //Sets dishes to empty array
        setError('No dishes were found.')
      }
    }catch(err){
      setError('An error occured while fetching the dishes.')
      console.log(err)
    }finally{
      setLoading(false) // Sets loading to false
    }
  }

  return (
    <div className='dishes'>
      <h1>Dish Finder</h1>
      <form onSubmit={fetchDishes}>
        <div className="input-button">
          <input type="text" placeholder='Enter a dish name' value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <button type='submit'>Search</button>
        </div>
      </form>
      {loading && <p>Loading dish(es)...</p>}
      {error && <p>{error}</p>}
      <DishList dishes={dishes}/>
    </div>
  )
}

export default App
