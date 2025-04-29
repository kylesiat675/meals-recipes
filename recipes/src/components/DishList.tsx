import { DishItemCard } from "./DishItemCard";

//Lists out all the dishes in a grid format using DishItemCard component
export function DishList({ dishes }: { dishes: any[] }) {
    return (
        <div className="flex flex-wrap gap-5 justify-center items-center m-5 p-5 bg-[rgb(46,46,46)]">
            {dishes.map((dish) => (
                <DishItemCard key={dish.idMeal} dish={dish} />
            ))}
        </div>
    );
}
