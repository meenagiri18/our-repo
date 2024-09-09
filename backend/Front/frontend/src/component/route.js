import React,{ useState,useEffect} from 'react'
import './route.css'
import Navbar from './navbar'
import axios from "axios";

export default function RouteForm() {
  const [flocation, setFlocation] = useState('');
  const [tlocation, setTlocation] = useState('');
  const [shortestPath, setShortestPath] = useState(null);
  const [data, setData] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { flocation, tlocation });
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/route/', {
        flocation,
        tlocation
      });
  
      // Manual JSON decoding (though unnecessary in this case)
      const jsonData = JSON.parse(JSON.stringify(response.data));
      const { shortestPath } = jsonData;
      setShortestPath(shortestPath);
    } catch (error) {
      console.error('Error:', error.response?.data?.error || error.message);
    }
  };
  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/api/calculate_route/').then((response)=>{
  //     setData(response.data);
  //     console.log(response.data)
  //   })
                        
  // }, [])
  

  return (
    <div>
        <div><Navbar/></div>
        <div className='main-container2'>
            <div className='main2'>
            
      <form onSubmit={handleSubmit} >
        <div className='design3'>
            <div className='field'>
                <label htmlFor='flocation'>From location</label>
                <input name = "Flocation" id='flocation' type='text'value={flocation}  onChange={(e) => setFlocation(e.target.value)} required></input>
            </div>
            <div className='field'>
                <label htmlFor='tlocation'>To location</label>
                <input name = "Tlocation" id='tlocation' type='text'value={tlocation}
                  onChange={(e) => setTlocation(e.target.value)} required></input>
            </div>
        </div>
        <div>
            <button type='submit'>Check</button>
        </div>
        
      </form>

      {/* {shortestPath && (
            <div className="result">
              <h3>Shortest Path: {shortestPath} km</h3>
            </div>
          )} */}

      </div>
      </div>
    </div>
  )
}
