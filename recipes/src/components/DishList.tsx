import { useEffect } from "react";
import { DishItemCard } from "./DishItemCard";

//Lists out all the dishes in a grid format using DishItemCard component
export function DishList({ dishes }: { dishes: any[] }) {
    //Whenever the list of dishes changes (button clicked/prompt changed), it scrolls towards the new sets of dishes in DishList
    useEffect(()=>{
            if(dishes.length>0){
                //Set timer to make the scrolling smoother
                const timer = setTimeout(() => {
                    const dishListSection = document.querySelector(".dish-list");
                    dishListSection?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
    
                return () => clearTimeout(timer);
            }
        }, [dishes])
    return (
        <div className="flex flex-wrap gap-5 justify-center items-center m-5 p-5 bg-[#f7e3c8] rounded-[16px] dish-list">
            {dishes.map((dish) => (
                <DishItemCard key={dish.idMeal} dish={dish} />
            ))}
        </div>
    );
}
