//Takes a prompt called dish from the user and displays the dish name and image in a card format
export function DishItemCard({ dish }: {dish: any}){
    //Make the image and name clickable so a dish item modal opens with all the information and links to the dish
    return (
        <div className="flex flex-col items-center justify-center">
            <img src={dish.strMealThumb} alt={dish.strMeal} className="w-[15em] h-auto rounded-[10%]" />
            <h2 className="text-center m-0 w-[240px] h-auto">{dish.strMeal}</h2>
        </div>
    );
}