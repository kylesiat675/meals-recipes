import axios from "axios";
import { useEffect, useState } from "react";

//STILL NEED TO DO:
// - Fix the modal to have more information
// - Fix mobile responsiveness and sideways for mobiles (sizing)
// - STILL NEED TO FIX CSS

//Agenda - May 05, 2025
// - Fix dish item card modal sizing (for pc and mobile)
// - Add more information inside the modal (ingredients, instructions, etc...)

//Takes a prompt called dish from the user and displays the dish name and image in a card format
export function DishItemCard({ dish }: {dish: any}){
    const [dishInfo, setDishInfo] = useState<any[]>([]);
    const [videoLink, setVideoLink] =useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ingredientList, setIngredientList] = useState<string[]>([]);

    const fetchDishInfo = async (id: string) => {
        try{
            //Fetches dishes that has the prompt in the name
            const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            if(res.data.meals){
                //Fixes the youtube URL link to add embed to the URL
                const youtubeUrl = res.data.meals[0].strYoutube;
                const videoId = youtubeUrl ? new URLSearchParams(new URL(youtubeUrl).search).get('v') : null;
                const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';
                setVideoLink(embedUrl)
                //Sets the dishes state to the response data with the dishes
                setDishInfo(res.data.meals)
            }else{
                setDishInfo([]) //Sets dishes to empty array
            }
        }catch(err){
            console.log(err)
        }
    };

    function getIngredients(){
        let ingList: string[] = [];
        let n: number = 1
        const dish = dishInfo[0]
        while(dish[`strIngredient${n}`]){
            ingList.push((dish[`strIngredient${n}`]))
            n++;
        }
        setIngredientList(ingList);
    }

    function handleClick() {
        const currentId = dish.idMeal;
        fetchDishInfo(currentId)
        setIsModalOpen(true); // Open modal
    }

    function closeModal() {
        setIsModalOpen(false); // Close modal
    }

    useEffect(() =>{
        if(dishInfo.length > 0) getIngredients();
    },[dishInfo])
    //Make the image and name clickable so a dish item modal opens with all the information and links to the dish
    return (
        <div className="flex flex-col items-center justify-center">
            <a onClick={handleClick} className="cursor-pointer">
                <img src={dish.strMealThumb} alt={dish.strMeal} className="w-[15em] h-auto rounded-[10%]" />
                <h2 className="text-center m-0 w-[240px] h-auto">{dish.strMeal}</h2>
            </a>

            {isModalOpen && dishInfo.length > 0 && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
                    <div className="bg-[rgb(0,0,0)] p-6 rounded relative flex">
                    <div className="w-[560px] h-[600px] bg-black overflow-hidden rounded-lg flex flex-col">
  {/* Scrollable Section (including video) */}
  <div className="flex-1 overflow-y-auto w-full px-4 py-2 text-white flex flex-col items-center">
    
    {/* YouTube Link */}
    <a className="text-xl text-blue-400 mb-2" href={dishInfo[0].strYoutube} target="_blank" rel="noopener noreferrer">
      YouTube Link
    </a>

    {/* YouTube Video */}
    {videoLink ? (
      <iframe className="w-full h-[400px] my-4" src={videoLink} allowFullScreen />
    ) : (
      <p className="text-[red]">No YouTube link available for this dish.</p>
    )}

    {/* Meal Title */}
    <div className="text-xl text-center mb-2">{dishInfo[0].strMeal}</div>

    {/* Source Link */}
    <a href={dishInfo[0].strSource} className="text-xl text-blue-400 block mb-2" target="_blank" rel="noopener noreferrer">
      Learn More...
    </a>

    {/* Ingredient List */}
    {ingredientList.map((ing, index) => (
      <div key={index} className="text-center">{ing}</div>
    ))}

  </div>
</div>

                        <button
                        onClick={closeModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded absolute top-3 right-3"
                        >
                        Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}