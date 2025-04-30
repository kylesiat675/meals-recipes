import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import './App.css'
import { useState } from 'react'
import { GetDishes } from './components/GetDishes';
import { Ingredients } from "./components/Ingredients";
import { Cuisines } from "./components/Cuisines";
import { Category } from "./components/Category";

//THINGS TO IMPLEMENT
//Dark mode (cool showcase for design)
//Setup different categories, areas (cuisines), use of different ingredients, etc. (navbar?)
//Better CSS design and styling (modern design)
//Introduce useMemo and useCallback if we need to avoid re-rendering or if the app has expensive calculations.
//Maybe a reactive search bar (costly and frequent API calls)

//STATE MANAGEMENT
//PLACE ALL THE IMPORTANT PROPS IN APP.TSX SO IT IS EASY TO MANAGE THE STATE FOR EACH CONSTANT
function App() {
  const [prompt, setPrompt] = useState<string>('') //Get user prompt
  const [dishes, setDishes] = useState<any[]>([]) //Get the dishes based on user prompt

  // Home Page
  const Home = () => {
    return (
        <div className="flex items-center justify-center flex-col gap-4">
            <h1 className="font-bold">Home Page</h1>
            <div className="text-2xl">304 Different recipes to choose from!</div>
        </div>
    );
  };

  //Resets the values of dishes and prompt when traversing to a new link
  const resetValues = () => {
    setDishes([]);
    setPrompt('')
  }
  return (
    <Router>
      <nav className="flex justify-center">
          <ul className="flex flex-row justify-between px-2 items-center md:text-xl text-sm py-4 border-2 border-white rounded-[10px] mb-4 md:w-1/2 w-full">
              <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'link')} onClick={resetValues}>Home</NavLink></li>
              <li><NavLink to="/dishes" className={({ isActive }) => (isActive ? 'active-link' : 'link')} onClick={resetValues}>Dishes</NavLink></li>
              <li><NavLink to="/ingredients" className={({ isActive }) => (isActive ? 'active-link' : 'link')} onClick={resetValues}>Ingredients</NavLink></li>
              <li><NavLink to="/cuisines" className={({ isActive }) => (isActive ? 'active-link' : 'link')} onClick={resetValues}>Cuisines</NavLink></li>
              <li><NavLink to="/category" className={({ isActive }) => (isActive ? 'active-link' : 'link')} onClick={resetValues}>Category</NavLink></li>
          </ul>
      </nav>
      {/*Set up routes and router for each component */}
      <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/dishes" element=
            {<GetDishes
              prompt={prompt}
              setPrompt={setPrompt}
              dishes={dishes}
              setDishes={setDishes}
            />}/>

            <Route path="/ingredients" element=
            {<Ingredients
              prompt={prompt}
              setPrompt={setPrompt}
              dishes={dishes}
              setDishes={setDishes}
            />}/>

            <Route path="/cuisines" element=
            {<Cuisines
              prompt={prompt}
              setPrompt={setPrompt}
              dishes={dishes}
              setDishes={setDishes}
            />}/>

            <Route path="/category" element=
            {<Category
              prompt={prompt}
              setPrompt={setPrompt}
              dishes={dishes}
              setDishes={setDishes}
            />}/>
      </Routes>
    </Router>
  );
}

export default App