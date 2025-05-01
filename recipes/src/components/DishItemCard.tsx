import axios from "axios";
import { useState } from "react";
//Takes a prompt called dish from the user and displays the dish name and image in a card format
export function DishItemCard({ dish }: {dish: any}){
    const [dishInfo, setDishInfo] = useState<any[]>([]);
    //const [dishId, setDishId] = useState<number>();
    const [videoLink, setVideoLink] =useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState(false);

    //!!!!!!! NEED TO FIX, FETCH THE DISH INFO AFTER THE HANDLECLICK FUNCTION FIRES !!!!!!!
    const fetchDishInfo = async (id: string) => {
        try{
            //Fetches dishes that has the prompt in the name
            const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)

            const youtubeUrl = res.data.meals[0].strYoutube;
            const videoId = youtubeUrl ? new URLSearchParams(new URL(youtubeUrl).search).get('v') : null;
            const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';
            setVideoLink(embedUrl)

            if(res.data.meals){
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
                    <div className="bg-[rgb(0,0,0)] p-6 rounded max-w-3/4 w-full relative">
                        <div className="flex flex-col items-center justify-center py-2 h-auto gap-6 rounded-2xl">
                            <img src={dishInfo[0].strMealThumb} className="w-[15em] h-auto rounded-[10%]"/>

                            {videoLink ? (
                                <iframe width="640" height="480" src={videoLink} />
                                ) : (
                                <p>No YouTube link</p>
                            )}
                            
                            <div>
                            Dish Name: {dishInfo[0].strMeal}
                            </div>
                            <div className="text-white">
                                Dish ID: {dishInfo[0].idMeal}
                            </div>
                        </div>
                        <button
                        onClick={closeModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded absolute bottom-3 right-3"
                        >
                        Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}