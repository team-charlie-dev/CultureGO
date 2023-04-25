import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Homepage/home";
import Liked from "./Pages/Likedpage/liked";
import Tags from "./Pages/Tagpage/tags";
import Settings from "./Pages/settingspage/settings";


function App() {
  const [currentPage, setCurrentPage] = useState('settings');

  const getPage = () =>{
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'liked':
        return <Liked />;
      case 'tags':
        return <Tags />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  }
  return (
    <div className="w-screen bg-primary">
      <div className="h-screen m-auto w-screen max-w-md relative">

        <Navbar state={[currentPage, setCurrentPage]} >
          {
            getPage(currentPage)
          }
        </Navbar>
      </div>
    </div>
  );
}

export default App;