//Takes a prompt called dish from the user and displays the dish name and image in a card format
export function DishItemCard({ dish }: {dish: any}){
    return (
        <div className="dish-item-card">
            <img src={dish.strMealThumb} alt={dish.strMeal} className="dish-image" />
            <h3 className="dish-name">{dish.strMeal}</h3>
        </div>
    );
}