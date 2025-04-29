import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import './App.css'
import { GetDishes } from './components/GetDishes';

//THINGS TO IMPLEMENT
//Dark mode (cool showcase for design)
//Setup different categories, areas (cuisines), use of different ingredients, etc. (navbar?)
//Better CSS design and styling (modern design)
//Introduce useMemo and useCallback if we need to avoid re-rendering or if the app has expensive calculations.
//Maybe a reactive search bar (costly and frequent API calls)

function App() {
// Home Page Component
const Home = () => {
  return (
      <div className="flex items-center justify-center">
          <h2 className="text-2xl">Home Page</h2>
      </div>
  );
};


  return (
    <Router>
      <nav className="flex justify-center">
          <ul className="flex flex-row justify-center items-center gap-10 text-large py-4 border-2 border-white rounded-[10px] w-full mb-4">
              <li><Link to="/" className="nav-item">Home</Link></li>
              <li><Link to="/dishes" className="nav-item">Dishes</Link></li>
              <li><Link to="/ingredients" className="nav-item">Ingredients</Link></li>
              <li><Link to="/cuisine" className="nav-item">Cuisine</Link></li>
          </ul>
      </nav>
      <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/dishes" element={<GetDishes/>}/>
      </Routes>
    </Router>
  );
}

export default App