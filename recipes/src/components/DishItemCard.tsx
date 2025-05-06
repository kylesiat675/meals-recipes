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
        <div className="flex flex-col items-center justify-center border-1 border-solid bg-[#f7ead1] border-[#e3b04c] shadow-md rounded-[16px]">
            <a onClick={handleClick} className="cursor-pointer">
                <img src={dish.strMealThumb} alt={dish.strMeal} className="w-[15em] h-auto rounded-t-[16px]" />
                <h2 className="text-center my-2 w-[240px] h-auto">{dish.strMeal}</h2>
            </a>
            {/* Dish Item Modal */}
            {isModalOpen && dishInfo.length > 0 && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]" onClick={closeModal}>
                    <div className="bg-[#e2d8bf] p-6 relative flex lg:w-3/4 lg:h-3/4 w-[95vw] h-[80vh] rounded-[16px] py-12">
                        <div className="w-full h-full overflow-hidden flex flex-col">
                            <div className="overflow-y-auto pl-1 pr-2 py-1 text-white flex flex-col items-center gap-2 h-full m-0" onClick={(e) => e.stopPropagation()}>
                                <div className="text-3xl font-bold text-center flex-shrink-0 text-[#3A0519]">{dishInfo[0].strMeal}</div>
                                <div className="w-full h-3/5 flex-shrink-0 flex items-center justify-center">
                                    {videoLink ? (
                                    <iframe className="w-full h-full rounded-2xl" src={videoLink} allowFullScreen />
                                    ) : (
                                    <p className="text-[red] text-2xl">No YouTube link available for this dish.</p>
                                    )}
                                </div>
                                <a className="text-xl text-blue-400 flex-shrink-0" href={dishInfo[0].strYoutube} target="_blank" rel="noopener noreferrer">
                                    YouTube Link
                                </a>
                                <div className="text-2xl font-bold text-[#3A0519] roboto-mono my-4">Ingredient List</div>
                                <div className="w-full flex items-center justify-center bg-[#e8e5dc] p-8 roboto-mono h-full">
                                    <div className="text-left text-black" >
                                        {ingredientList.map((ing, index) => (
                                        <div key={index} className="text-xl">{ing}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-xl font-bold text-[#3A0519] roboto-mono my-4">Cooking Instructions:</div>
                                <div className="text-black w-full bg-[#e8e5dc] p-8 roboto-mono">
                                    {dishInfo[0].strInstructions}
                                </div>
                                <a href={dishInfo[0].strSource} className="text-xl text-blue-400 flex-shrink-0" target="_blank" rel="noopener noreferrer">
                                    Click here to learn more...
                                </a>
                            </div>
                        </div>
                    {/* Button to close the modal */}
                    <button onClick={closeModal}
                    className="bg-blue-500 text-white text-center absolute top-3 right-3 px-2.5 py-1">
                        X
                    </button>
                    </div>
                </div>
            )}
        </div>
    );
}