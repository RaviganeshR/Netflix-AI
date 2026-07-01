import React, { useRef, useState } from "react";
import Header from "./Header";
import { emailValidation } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [showSignInText, setShowSignInText] = useState(true);
  const [errorText, setErrorText] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fullName = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userValue = useSelector((state) => state?.user);

  const handleChange = (e) => {
    setShowSignInText(!showSignInText);
  };

  const handleLoginSubmit = () => {
    const validation = emailValidation(
      emailRef.current?.value,
      passwordRef.current?.value,
    );
    if (validation !== null) {
      return setErrorText(validation);
    }
    console.log("auth", auth);
    if (!showSignInText) {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current?.value,
        passwordRef.current?.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("user", user);
          // console.log("userValue", userValue);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("user", errorMessage);
          setErrorText(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        emailRef.current?.value,
        passwordRef.current?.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  return (
    <div className="">
      <Header />
      <div className="absolute">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/81b52f88-dc76-488d-a939-0cf13a260a6e/web/IN-en-20260622-TRIFECTA-perspective_d39d60ef-cb5a-4793-9546-0a8d9a87948e_large.jpg"
          alt="bg-image"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute right-0 left-0 my-36 p-12 mx-auto bg-black w-3/12 opacity-80 text-white rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-6">
          {showSignInText ? "Sign In" : "Sign Up"}
        </h2>
        {!showSignInText && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 bg-gray-400 rounded-lg"
            ref={fullName}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="w-full p-3 mb-4 bg-gray-400 rounded-lg"
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-gray-400 rounded-lg"
          ref={passwordRef}
        />
        <p className="text-red-500 pb-2 text-center">{errorText}</p>
        <button
          className="w-full p-3 bg-red-600 mb-6 font-bold rounded cursor-pointer"
          onClick={handleLoginSubmit}
        >
          {showSignInText ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer" onClick={(e) => handleChange(e)}>
          {!showSignInText
            ? "Already having account? Sign In"
            : "Need to create Netflix account? Sign Up"}
        </p>
      </form>
    </div>
  );
};

export default Login;
