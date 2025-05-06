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
            console.log(res.data.meals)
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
        let ingredientArray: string[] = [];
        let n: number = 1
        const dish = dishInfo[0]
        while(dish[`strIngredient${n}`]){
            ingredientArray.push("["+dish[`strMeasure${n}`].trimEnd()+"] "+dish[`strIngredient${n}`])
            n++;
        }
        setIngredientList(ingredientArray);
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
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]" onClick={closeModal}>
                    <div className="bg-[rgb(0,0,0)] p-6 rounded relative flex w-3/4 h-3/4">
                        <div className="w-full h-full bg-black overflow-hidden rounded-lg flex flex-col">
                            {/* Scrollable content */}
                            <div className="overflow-y-auto px-4 py-2 text-white flex flex-col items-center gap-2 h-full m-0">
                                <div className="text-4xl font-bold text-center flex-shrink-0">{dishInfo[0].strMeal}</div>
                                <div className="w-4/5 h-7/8 flex-shrink-0">
                                    {videoLink ? (
                                    <iframe className="w-full h-full rounded-2xl" src={videoLink} allowFullScreen />
                                    ) : (
                                    <p className="text-[red]">No YouTube link available for this dish.</p>
                                    )}
                                </div>
                                <a className="text-xl text-blue-400 flex-shrink-0" href={dishInfo[0].strYoutube} target="_blank" rel="noopener noreferrer">
                                    YouTube Link
                                </a>
                                <div className="inline-block text-left mt-10 mb-10">
                                    <div className="text-xl font-bold">Ingredient List:</div>
                                    {ingredientList.map((ing, index) => (
                                    <div key={index}>{ing}</div>
                                    ))}
                                </div>
                                <a href={dishInfo[0].strSource} className="text-xl text-blue-400 flex-shrink-0" target="_blank" rel="noopener noreferrer">
                                    Learn More...
                                </a>
                            </div>
                        </div>
                    <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded absolute top-3 left-3">
                        Close
                    </button>
                    </div>
                </div>
            )}
        </div>
    );
}