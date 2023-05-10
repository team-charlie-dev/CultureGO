import React, { useState } from "react";
import LogoLarge from "../../Components/icons/LogoLarge";
import serverUrl from "../../address";

export default function Login({
  loginState: [isLoggedin, setIsLoggedin],
  setIsLoading,
}) {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isCredentialsValid, setIsCredentialsValid] = useState({
    username: false,
    password: false,
  });

  const [errorMsg, setErrorMsg] = useState("");

  function generateRandom(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const validatePassowrd = (password) => {
    if (password.length < 5) {
      setErrorMsg("Password must be at least 5 characters long");
      setIsCredentialsValid({ ...isCredentialsValid, password: false });
    } else if (password.includes(" ")) {
      setErrorMsg("Password must not include spaces");
      setIsCredentialsValid({ ...isCredentialsValid, password: false });
    } else {
      setErrorMsg("");
      setIsCredentialsValid({ ...isCredentialsValid, password: true });
    }
    setInputPassword(password);
  };

  const validateUsername = (username) => {
    if (username.length > 15) {
      setErrorMsg("Username cannot be longer than 15 characters long");
      setIsCredentialsValid({ ...isCredentialsValid, username: false });
    } else if (username.includes(" ")) {
      setErrorMsg("Username must not include spaces");
      setIsCredentialsValid({ ...isCredentialsValid, username: false });
    } else {
      setErrorMsg("");
      setIsCredentialsValid({ ...isCredentialsValid, username: true });
    }
    setInputUsername(username);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const res = await fetch(`${serverUrl}/signin`, {
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
    if (resJson?.error) {
      if (resJson.error === "Password incorrect") {
        setIsCredentialsValid({ ...isCredentialsValid, password: false });
      } else if (resJson.error === "User not found") {
        setIsCredentialsValid({ ...isCredentialsValid, username: false });
      }
      setErrorMsg(resJson.error);
    } else {
      localStorage.setItem("token", resJson.userData.token);
      localStorage.setItem("user_id", resJson.userData.user_id);
      localStorage.setItem("username", resJson.userData.username);
      setIsLoggedin(true);
    }
    setIsLoading(false);
  };
  const handleCreateAccount = async ({ guest }) => {
    setIsLoading(true);
    const res = await fetch(`${serverUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: guest ? generateRandom(10) : inputUsername,
        password: guest ? generateRandom(15) : inputPassword,
      }),
    });
    if (res.status == 403) {
      setIsLoggedin(false);
    }
    const resJson = await res.json();
    if (resJson?.error) {
      if (resJson.error === "User already exists") {
        setIsCredentialsValid({ ...isCredentialsValid, username: false });
      }
      setErrorMsg(resJson.error);
    } else {
      localStorage.setItem("token", resJson.userData.token);
      localStorage.setItem("user_id", resJson.userData.user_id);
      localStorage.setItem("username", resJson.userData.username);
      setIsLoggedin(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-full bg-white z-50 overflow-hidden">
      <div className="h-1/4 mt-10">
        <div className="flex flex-col justify-center h-full">
          <div className="flex flex-row justify-center">
            <LogoLarge />
          </div>
        </div>
      </div>

      <div
        className={`h-1/6 flex flex-col justify-center ${
          isCredentialsValid.password && isCredentialsValid.username
            ? "opacity-0"
            : "opacity-100"
        }`}
      >
        <div className="text-center text-xl ">{errorMsg}</div>
      </div>
      <div className="text-center">
        <button
          className={`bg-secondaryLight text-white rounded-md`}
          style={{
            border: "none",
            padding: "8px 50px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
          }}
          onClick={() => handleCreateAccount({ guest: true })}
        >
          Login as guest
        </button>
      </div>
      <div className="text-center mt-5">
        <h1>OR</h1>
      </div>
      <div className="h-1/3 flex">
        <div className="w-full flex items-center justify-center">
          <div className="w-5/6">
            <div className="mb-10">
              <label className="w-full text-center flex border-4 border-primaryDark rounded-lg mb-5">
                <p className="bg-primaryDark text-white p-2">Username:</p>
                <input
                  className="w-full p-2 outline-none"
                  type="text"
                  onChange={(e) => validateUsername(e.target.value)}
                />
              </label>
              <label className="w-full text-center flex border-4 border-primaryDark rounded-lg">
                <p className="bg-primaryDark text-white p-2">Password: </p>
                <input
                  className="w-full p-2 outline-none"
                  type="password"
                  onChange={(e) => validatePassowrd(e.target.value)}
                />
              </label>
            </div>
            <div className="w-full text-center flex justify-around">
              <button
                disabled={
                  !isCredentialsValid.password || !isCredentialsValid.username
                }
                className={`bg-primaryDark text-white rounded-md`}
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
                disabled={
                  !isCredentialsValid.password || !isCredentialsValid.username
                }
                className=" bg-primaryDark text-white rounded-md"
                style={{
                  border: "none",
                  padding: "15px 32px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onClick={() => handleCreateAccount({ guest: false })}
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
