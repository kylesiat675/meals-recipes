//Takes a prompt called dish from the user and displays the dish name and image in a card format
export function DishItemCard({ dish }: {dish: any}){
    return (
        <div className="dish-item-card">
            <a href={dish.strSource} target="_blank">
                <img src={dish.strMealThumb} alt={dish.strMeal} className="dish-image" />
            </a>
            <h2 className="dish-name">{dish.strMeal}</h2>
            <p className="dish-area">{dish.strArea}</p>
            <a className="dish-yt" target="_blank" href={dish.strYoutube}>YouTube Link</a>
        </div>
    );
}