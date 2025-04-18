import React from "react";
import './Layout.css';
import CarouselUsage from "./carousel";
import Box from '@mui/material/Box';
import PharmaImage from '../assets/logo-pharmacy-3215049_1280.jpg'
import Footer from "./footer";

function Home()
{
    return(
        <div>
            <CarouselUsage/><br/>
            <br/><br/>
            
            <div className="card">
            <Box
      sx={{
        p: 3,
        width: 400,
        height: 400,
        borderRadius: 2,
        boxShadow: 3,
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        
        textAlign: 'center',
        justifyContent: 'center'
      }}
    >
        <img 
        src={PharmaImage}
        style={{width:'400px',height:'400px',objectFit:'fill'}}
        alt = "hello"
        />
      
    </Box>
    
    <Box
    sx={{
        p: 3,
        width: 900,
        height: 400,
        borderRadius: 10,
        boxShadow: 3,
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        marginLeft:10,
        textAlign: 'center',
        justifyContent: 'center'
      }}
    >
          <h1 style={{fontSize:'40px'}}>About US</h1>
        <div className="text-style">

      
<p>
In today's fast-paced world, waiting in long lines at pharmacies is a thing of the past! With MedMaxDel, your health is just a tap away. We're proud to present an all-in-one medicine delivery platform that brings convenience, reliability, and speed right to your doorstep.
</p>
<p>Why Choose MedMaxDel?
💊 Endless Medicine Options
Never run out of your essential medications! With our platform, you can access a wide network of local pharmacies and order exactly what you need. Plus, we offer alternatives from nearby pharmacies if your current pharmacy runs out of stock.


</p>
<p>
🔄 Scheduled Deliveries
No more last-minute runs to the pharmacy.
</p>
<p>
Set up recurring orders for your ongoing prescriptions and get them delivered exactly when you need them. Perfect for those with chronic conditions who need medicines on time, every time
</p>

        </div>

    </Box>
    </div>
    <Footer/>
    
        </div>
        
            

    );
}
export default Home;