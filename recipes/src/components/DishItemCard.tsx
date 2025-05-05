import axios from "axios";
import { useState } from "react";

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

    function handleClick() {
        const currentId = dish.idMeal;
        fetchDishInfo(currentId)
        setIsModalOpen(true); // Open modal
    }

    function closeModal() {
        setIsModalOpen(false); // Close modal
    }
    //Make the image and name clickable so a dish item modal opens with all the information and links to the dish
    return (
        <div className="flex flex-col items-center justify-center">
            <a onClick={handleClick} className="cursor-pointer">
                <img src={dish.strMealThumb} alt={dish.strMeal} className="w-[15em] h-auto rounded-[10%]" />
                <h2 className="text-center m-0 w-[240px] h-auto">{dish.strMeal}</h2>
            </a>

            {isModalOpen && dishInfo.length > 0 && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
                    <div className="bg-[rgb(0,0,0)] p-6 rounded lg:w-1/2 sm:w-[90%] sm:h-[90%] lg:h-3/4 relative">
                        <div className="flex flex-col items-center justify-center p-2 gap-6 rounded-2xl w-full h-full overflow-y-auto">
                            <div className="text-xl">Dish Name: {dishInfo[0].strMeal}</div>
                            {videoLink ? (
                                <iframe className="w-full h-full py-8" src={videoLink} allowFullScreen />) : (<p className="text-[red]">No YouTube link available for this dish.</p>
                            )}
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