import Header from "./component/header";
import {Route,Routes} from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/Signup";
import Mainpage from './component/mainpage';
import Parcel  from "./component/parcel";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="" element={<Header/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/mainpage" element={<Mainpage/>}></Route>
          <Route path="/api/create_parcel" element={<Parcel/>}></Route>
          </Routes>
          </Router>
     


      
    </div>
    
  );
}

export default App;
