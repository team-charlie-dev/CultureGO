import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Homepage/home";
import Liked from "./Pages/Likedpage/liked";
import Tags from "./Pages/Tagpage/tags";
import Settings from "./Pages/settingspage/settings";
import Login from "./Pages/Loginpage/login";
import serverUrl from "./address";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const validateResponse = async () => {
      const res = await fetch(`http://${serverUrl}:4000/validatetoken`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return await res.json();
    };
    validateResponse().then((res) => {
      if (res.message === "Token valid") setIsLoggedin(true);
    });
  }, []);

  const getPage = () => {
    if (isLoggedin) {
      switch (currentPage) {
        case "home":
          return <Home setIsLoggedin={setIsLoggedin} />;
        case "liked":
          return <Liked setIsLoggedin={setIsLoggedin} />;
        case "tags":
          return (
            <Tags changeScreen={setCurrentPage} setIsLoggedin={setIsLoggedin} />
          );
        case "settings":
          return <Settings loginState={[isLoggedin, setIsLoggedin]} />;
        default:
          return <Home setIsLoggedin={setIsLoggedin} />;
      }
    } else {
      return <Login loginState={[isLoggedin, setIsLoggedin]} />;
    }
  };

  return (
    <div className="w-screen bg-primary font-inriaSans overflow-hidden fixed">
      <div className="h-screen m-auto w-screen max-w-md relative">
        <Navbar state={[currentPage, setCurrentPage]}>
          {getPage(currentPage)}
        </Navbar>
      </div>
    </div>
  );
}

export default App;
