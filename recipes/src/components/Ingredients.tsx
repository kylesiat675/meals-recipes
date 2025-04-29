import { DishList } from './DishList'
import { useState } from 'react'
import axios from 'axios'

type IngredientsProps ={
    prompt: string;
    setPrompt: (value: string) => void;
    dishes: any[];
    setDishes: (value: any[]) => void;
}

export function Ingredients({prompt, setPrompt, dishes, setDishes}: IngredientsProps) {
    const [loading, setLoading] = useState(false) //Loading state
    const [error, setError] = useState<string | null>(null) //Error state

    const fetchDishes = async (e: any) => {
        e.preventDefault() //Prevents the default submission when the button is clicked
        setLoading(true) //Sets loading state to true
        setError(null) //Sets error state to null (no error)
        try{
          const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${prompt}`) //Fetches dishes that has the prompt in the name
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

    return(
        <div className='w-full flex flex-col justify-center items-center gap-8'>
            <h1>Ingredients</h1>
            <form onSubmit={fetchDishes}>
                <div className="flex flex-col justify-center items-center gap-2.5">
                <input type="text" placeholder='Enter an ingredient' value={prompt} onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-full text-lg px-4 py-2 rounded-2xl border-[rgb(46,46,46)] border-[3px]"/>
                <button type='submit'>Search</button>
                </div>
            </form>
            {loading && <p>Loading dish(es)...</p>}
            {error && <p>{error}</p>}

            {dishes.length > 0 && <DishList dishes={dishes}/>} {/*Renders the list of dishes only if its not an empty array*/}
    </div>
    )
}
