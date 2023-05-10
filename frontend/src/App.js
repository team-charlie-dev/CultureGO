import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Homepage/home";
import Liked from "./Pages/Likedpage/liked";
import Tags from "./Pages/Tagpage/tags";
import Settings from "./Pages/settingspage/settings";
import Login from "./Pages/Loginpage/login";
import serverUrl from "./address";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const validateResponse = async () => {
      const res = await fetch(`${serverUrl}/validatetoken`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return await res.json();
    };
    validateResponse().then((res) => {
      setIsLoading(false);
      if (res.message === "Token valid") setIsLoggedin(true);
    });
  }, []);

  const getPage = () => {
    if (isLoggedin) {
      switch (currentPage) {
        case "home":
          return (
            <Home setIsLoggedin={setIsLoggedin} setIsLoading={setIsLoading} />
          );
        case "liked":
          return (
            <Liked setIsLoggedin={setIsLoggedin} setIsLoading={setIsLoading} />
          );
        case "tags":
          return (
            <Tags
              changeScreen={setCurrentPage}
              setIsLoggedin={setIsLoggedin}
              setIsLoading={setIsLoading}
            />
          );
        case "settings":
          return <Settings loginState={[isLoggedin, setIsLoggedin]} />;
        default:
          return <Home setIsLoggedin={setIsLoggedin} />;
      }
    } else {
      return (
        <Login
          loginState={[isLoggedin, setIsLoggedin]}
          setIsLoading={setIsLoading}
        />
      );
    }
  };

  return (
    <div
      className="w-screen h-full font-inriaSans overflow-hidden fixed"
      style={{
        backgroundImage: "url(/BackgroundImage.svg)",
      }}
    >
      <div className="h-full m-auto w-screen max-w-md relative">
        {isLoading ? <LoadingScreen /> : ""}
        <Navbar state={[currentPage, setCurrentPage]}>
          {getPage(currentPage)}
        </Navbar>
      </div>
    </div>
  );
}

export default App;
