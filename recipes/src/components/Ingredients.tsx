import { DishList } from './DishList'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'

//Props to pass into Ingredients
type IngredientsProps ={
    prompt: string;
    setPrompt: (value: string) => void;
    dishes: any[];
    setDishes: (value: any[]) => void;
}

export function Ingredients({prompt, setPrompt, dishes, setDishes}: IngredientsProps) {
    const [ingredientList, setIngredientList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false) //Loading state
    const [error, setError] = useState<string | null>(null) //Error state

    const fetchDishes = async () => {
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
    //Whenever prompt changes, we fetch the new dishes
    useEffect(() => {
        if(prompt) fetchDishes();
    }, [prompt]);

    useEffect(() => {
        const fetchIngredientList = async () => {
            const res = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
                const list = res.data.meals.map((dish:any) =>({
                    value: dish.strIngredient,
                    label: dish.strIngredient,
                }));
                setIngredientList(list)
            };
            fetchIngredientList();
    }, []);


    return(
        <div className='w-full flex flex-col justify-center items-center gap-8'>
            <h1 className='text-3xl font-bold'>Ingredients</h1>
            <Select
            options={ingredientList}
            className="select text-black h-auto w-[240px]"
            onChange={(e:any)=>setPrompt(e.value)}
            isSearchable
            />
            {loading && <p>Loading dish(es)...</p>}
            {error && <p>{error}</p>}

            {dishes.length > 0 && <DishList dishes={dishes}/>} {/*Renders the list of dishes only if its not an empty array*/}
    </div>
    )
}
