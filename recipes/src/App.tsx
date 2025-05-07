import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import './App.css'
import { useState } from 'react'
import { Ingredients } from "./components/Ingredients";
import { Cuisines } from "./components/Cuisines";
import { Category } from "./components/Category";
import { GetDishes } from "./components/GetDishes";

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
        <div className="flex items-center justify-center flex-col gap-10 px-2 text-[#3A0519]">
            <h1 className="text-3xl font-bold">Welcome to <span className="text-[#be0432]">Disheasy!</span></h1>
            <div className="w-full flex items-center justify-center flex-col bg-[#e8e0c7] p-8 roboto-mono gap-12 rounded-2xl mb-4">
              <div className="text-2xl text-center mx-4">
                Your one stop shop for finding different types of dishes around the world! 🌍
              </div>
              <div className="text-2xl text-center mx-4">
                Try using the filters above to navigate through the different types of dishes that <b>Disheasy</b> offers. 
                Click on the dish to get more information. 🔍
              </div>
              <div className="text-2xl text-center mx-4">
                <b>Disheasy</b> provides all the necessary information a foodie, a home cook, or anyone interested in cooking will ever need. 🍴👩‍🍳
              </div>
              <div className="text-2xl text-center mx-4">
                Such as a quick YouTube video for the dish you're interested in to get you started (YouTube link also provided) 🎥🍴🎬
              </div>
              <div className="text-2xl text-center mx-4">
                Or maybe a list of ingredients with their appropriate measures? 🥩🧀🍅 Or even a step by step instruction on how to make this exciting dish! 🍽️
              </div>
              <div className="text-2xl text-center mx-4">
                Want to get more detailed information? Then click <b>"Learn more"</b> at the bottom of the inside of the dish to go to a website with even more detailed information!
              </div>
              <div className="text-2xl text-center mx-4">
                With over <b className="text-orange-400">304</b> kinds of diverse dishes to choose from! 🍝🍣🥙
              </div>
            </div>
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
      <nav className="flex justify-center mt-4">
          <ul className="flex flex-row flex-wrap justify-between px-8 items-center md:text-2xl text-lg pt-2 pb-1 border-b-3 border-black mb-8 md:w-1/2 w-full">
              <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'link')} onClick={resetValues}>Home</NavLink></li>
              <div className="font-bold text-[#3A0519] cursor-default">|</div>
              <li><NavLink to="/dishes" className={({ isActive }) => (isActive ? 'active-link' : 'link')} onClick={resetValues}>Dishes</NavLink></li>
              <div className="font-bold text-[#3A0519] cursor-default">|</div>
              <li><NavLink to="/ingredients" className={({ isActive }) => (isActive ? 'active-link' : 'link')} onClick={resetValues}>Ingredients</NavLink></li>
              <div className="font-bold text-[#3A0519] cursor-default">|</div>
              <li><NavLink to="/cuisines" className={({ isActive }) => (isActive ? 'active-link' : 'link')} onClick={resetValues}>Cuisines</NavLink></li>
              <div className="font-bold text-[#3A0519] cursor-default">|</div>
              <li><NavLink to="/category" className={({ isActive }) => (isActive ? 'active-link' : 'link')} onClick={resetValues}>Category</NavLink></li>
          </ul>
      </nav>
      {/*Set up routes and router for each component */}
      <Routes>
            <Route path="/" element={<Home />}/>

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