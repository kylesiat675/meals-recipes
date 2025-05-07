import { DishList } from './DishList'
import { useState } from 'react'
import axios from 'axios'

//Props to pass into GetDishes
type GetDishesProps ={
    prompt: string;
    setPrompt: (value: string) => void;
    dishes: any[];
    setDishes: (value: any[]) => void;
}

export function GetDishes({prompt, setPrompt, dishes, setDishes}: GetDishesProps) {
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

    return(
        <div className='w-full flex flex-col justify-center items-center gap-8'>
            <h1 className='text-3xl font-bold text-[#3A0519] text-center'>Find a dish! <br></br>(or part of a dish)</h1>
            <form onSubmit={fetchDishes}>
                <div className="flex flex-col justify-center items-center gap-4">
                    <input type="text" placeholder='Enter a dish name' value={prompt} onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-full text-lg px-4 py-2 rounded-lg border-[rgb(46,46,46)] border-3"/>
                    <button type='submit' className='w-full text-center rounded-lg px-[1.2rem] py-[0.6rem]'>Search</button>
                </div>
            </form>
            {loading && <p>Loading dish(es)...</p>}
            {error && <p>{error}</p>}

            {dishes.length > 0 && <DishList dishes={dishes}/>} {/*Renders the list of dishes only if its not an empty array*/}
    </div>
    )
}
