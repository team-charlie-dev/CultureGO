import React, { useState } from "react";
import LogoLarge from "../../Components/icons/LogoLarge";
import serverUrl from "../../address";

export default function Login({ loginState: [isLoggedin, setIsLoggedin] }) {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [unsuccessful, setUnsuccessful] = useState(false);

  const handleLogin = async () => {
    const res = await fetch(`http://${serverUrl}:4000/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword,
      }),
    });
    if (res.status == 403) {
      setIsLoggedin(false);
    }
    const resJson = await res.json();
    if (resJson?.data?.message === "Login unsuccessful") {
      setUnsuccessful(true);
    } else {
      localStorage.setItem("token", resJson.data.userData.token);
      localStorage.setItem("user_id", resJson.data.userData.user_id);
      localStorage.setItem("username", resJson.data.userData.username);
      setIsLoggedin(true);
    }
  };
  const handleCreateAccount = async () => {
    const res = await fetch(`http://${serverUrl}:4000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword,
      }),
    });
    if (res.status == 403) {
      setIsLoggedin(false);
    }
    const resJson = await res.json();
    localStorage.setItem("token", resJson.token);
    localStorage.setItem("user_id", resJson.user_id);
    localStorage.setItem("username", resJson.username);
    setIsLoggedin(true);
  };

  return (
    <div className="relative w-full h-full bg-white z-50 overflow-hidden">
      <div className="h-1/4 ">
        <div className="flex flex-col justify-center h-full">
          <div className="flex flex-row justify-center">
            <LogoLarge />
          </div>
        </div>
      </div>

      <div
        className={`h-1/5 flex flex-col justify-end ${
          unsuccessful ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center text-2xl ">Wrong Password or Username</div>
      </div>

      <div className="h-1/2 flex">
        <div className="w-full flex items-center justify-center">
          <div className="w-5/6">
            <div className="mb-10">
              <label className="w-full text-center flex border-4 border-primaryDark rounded-lg mb-5">
                <p className="bg-primaryDark text-white p-2">Username:</p>
                <input
                  className="w-full p-2 outline-none"
                  type="text"
                  onChange={(e) => setInputUsername(e.target.value)}
                />
              </label>
              <label className="w-full text-center flex border-4 border-primaryDark rounded-lg">
                <p className="bg-primaryDark text-white p-2">Password: </p>
                <input
                  className="w-full p-2 outline-none"
                  type="password"
                  onChange={(e) => setInputPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="w-full text-center flex justify-around">
              <button
                className=" bg-primaryDark text-white rounded-md"
                style={{
                  border: "none",
                  padding: "15px 32px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onClick={() => handleLogin()}
              >
                Login
              </button>

              <button
                className=" bg-primaryDark text-white rounded-md"
                style={{
                  border: "none",
                  padding: "15px 32px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onClick={() => handleCreateAccount()}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
