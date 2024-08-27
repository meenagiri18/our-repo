import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/Signup";
import Mainpage from './component/mainpage';
import Parcel from "./component/parcel";
import Homepage from './component/homepage';
import About from './component/about'
import TrackingForm from './component/tracking'
 


function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/mainpage" element={<Mainpage />}></Route>
          <Route path="/api/create_parcel" element={<Parcel />}></Route>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/api/track_parcel" element={<TrackingForm />}></Route>
        </Routes>
        
      </Router>



    </div>

  );
}

export default App;
