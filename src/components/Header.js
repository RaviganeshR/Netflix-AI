import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
import { LOGO } from "../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStoreDetails = useSelector((state) => state?.user);

  useEffect(() => {
    const authStateChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDetails = user;
        console.log("usedetails", userDetails);
        dispatch(
          addUser({
            uid: userDetails.uid,
            email: userDetails.email,
            displayName: userDetails.displayName,
          }),
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      authStateChange();
    };
  }, []);

  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="absolute w-full z-10 flex justify-between">
      <div>
        <img className="w-44" src={LOGO} alt="logo" />
      </div>
      {userStoreDetails && (
        <div className="flex m-2 items-center justify-center">
          <img className="w-16 h-12 px-2" src="/movieboard.jpeg" alt="logo" />
          <p className="cursor-pointer" onClick={onSignOut}>
            Sign Out
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
