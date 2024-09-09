import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/Signup";
import Mainpage from './component/mainpage';
import Homepage from './component/homepage';
import About from './component/about'
import TrackParcel from './component/tracking';
import Shipment from './component/shipment'
import Contact from './component/contact'
import RouteForm from './component/route'


function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/mainpage" element={<Mainpage />}></Route>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/shipment" element={<Shipment />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/track" element={<TrackParcel />}> </Route>
          <Route path="/route" element={<RouteForm />}> </Route>
         
          
        </Routes>
        
      </Router>



    </div>

  );
}

export default App;
