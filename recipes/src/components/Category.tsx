import { DishList } from './DishList'
import { useState, useEffect } from 'react'
import axios from 'axios'

//Props to pass into Category
type CategoryProps ={
    prompt: string;
    setPrompt: (value: string) => void;
    dishes: any[];
    setDishes: (value: any[]) => void;
}

export function Category({prompt, setPrompt, dishes, setDishes}: CategoryProps) {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false) //Loading state
    const [error, setError] = useState<string | null>(null) //Error state

    const fetchDishes = async () => {
        setLoading(true) //Sets loading state to true
        setError(null) //Sets error state to null (no error)
        try{
          const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${prompt}`) //Fetches dishes that has the prompt in the name
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

    //Whenever prompt changes, we fetch the new dishes
    useEffect(() => {
        if(prompt) fetchDishes();
    }, [prompt]);

    //Gets all the categories available in the API
    useEffect(() => {
        const fetchCategory = async () => {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
                setCategories(response.data.meals);
            };
            fetchCategory();
    }, []);

    return(
        <div className='w-full flex flex-col justify-center items-center gap-8'>
            <h1 className='text-3xl font-bold text-[#3A0519]'>Select a category!</h1>
            <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 justify-items-center'>
                {categories.map((category, index) => (
                    <button className='
                    w-full text-center rounded-lg px-[1.2rem] py-[0.6rem]'
                    key={index}
                    onClick={(e:any)=>setPrompt(e.currentTarget.textContent)}
                    >{category.strCategory}</button>
                ))}
            </div>
            {loading && <p>Loading dish(es)...</p>}
            {error && <p>{error}</p>}

            {dishes.length > 0 && <DishList dishes={dishes}/>} {/*Renders the list of dishes only if its not an empty array*/}
    </div>
    )
}
