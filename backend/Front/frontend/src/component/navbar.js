import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
  

    const handleSignOut = async () => {
      try {
        // Make an API call to signout endpoint
        const response = await fetch("/signout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          // Redirect to login page after successful signout
          navigate("/");
  
           // Disable the back button by clearing history
        window.history.pushState(null, null, window.location.href);
        window.addEventListener("popstate", function(event) {
        window.history.pushState(null, null, window.location.href);
        });
  
        } else {
          console.error("Failed to sign out");
        }
      } catch (error) {
        console.error("Error during signout", error);
      }
    };
    return (
        <div>
            <div className=' sub2 container-fluid d-flex justify-content-between'>
                <div>
                    <Link to="/" className='heading' >ExpressTrack</Link>
                </div>

                <div className='d-flex listing'>
                    <div>
                        <Link to="/mainpage" className='any' >Home</Link>
                    </div>

                    <div>
                        <Link to="/about" className='any'>About</Link>
                    </div>
                    <div>
                        <Link to="/shipment" className='any'>Start Shipment</Link>
                    </div>
                    <div>
                        <Link to="/track" className='any'>Tracking</Link>
                    </div>
                   
                    <div>
                        <Link to="/route" className='any'>Route</Link>
                    </div>


                </div>
                <div className=' btn'>
                <button onClick={handleSignOut}><Link to="/" className='log'>Logout</Link></button>
                
            </div>

            </div>
        </div>
    )
}
