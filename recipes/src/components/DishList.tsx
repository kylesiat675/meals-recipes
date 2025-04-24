import { DishItemCard } from "./DishItemCard";

//Lists out all the dishes in a grid format using DishItemCard component
export function DishList({ dishes }: { dishes: any[] }) {
    return (
        <div className="dish-list">
            {dishes.map((dish) => (
                <DishItemCard key={dish.idMeal} dish={dish} />
            ))}
        </div>
    );
}
