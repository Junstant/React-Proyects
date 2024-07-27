import React, { createContext, useState, useContext, useEffect } from "react";
//create the context
const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  //! -----------------  STATES -----------------------------------------

  // actual global  user
  const [actualUser, setActualUser] = useState({
    email: "",
    password: "",
    isLogged: false,
    isAdmin: false,
  });

  // database of users
  const [userDatabase, setUserDatabase] = useState([
    {
      email: "admin@outlook.com",
      password: "admin",
      isLogged: false,
      isAdmin: true,
    },
  ]);
  // database of colors
  const colorDataBase = [
    {
      color: ['#17153B', '#2E236C', '#433D8B', '#C8ACD6', ],
      likes: '594',
      time: '4 days',
    },
    {
      color: ['#96B6C5', '#ADC4CE', '#EEE0C9', '#F1F0E8'],
      likes: '20,252',
      time: '11 months',
    },
    {
      color: ['#FFEECC', '#FFDDCC', '#FFCCCC', '#FEBBCC'],
      likes: '16,250',
      time: '1 year',
    },
    {
      color: ['#B5C0D0', '#CCD3CA', '#F5E8DD', '#EED3D9'],
      likes: '11,302',
      time: '4 months',
    },
    {
      color: ['#F1EAFF', '#E5D4FF', '#DCBFFF', '#D0A2F7'],
      likes: '9,080',
      time: '3 years',
    },
    {
      color: ['#FFD6BA', '#FFAAA6', '#FF8C94', '#FF6A8A'],
      likes: '6,250',
      time: '1',
    },
  ]

  //! -----------------  FUNCTIONS -----------------------------------------

  //update the actual user and save it in the local storage
  const handleActualUser = (user) => {
    setActualUser({ ...user, isLogged: true });
    localStorage.setItem("user", JSON.stringify({ ...user, isLogged: true }));
  };

  //update the user database and save it in the local storage, bcs when refresh the database is empty, the default parameters is the cons USER
  const handleUserDatabase = (email, password) => {
    const user = { email: email, password: password, isLogged: false, isAdmin: false };
    setUserDatabase([...userDatabase, user]);
    // send the user to the actual user but with the isLogged true
    setActualUser({ ...user, isLogged: true });
    //save the user in the local storage
    localStorage.setItem("users", JSON.stringify([...userDatabase, user]));
    //save the user in the local storage but logged
    localStorage.setItem("user", JSON.stringify({ ...user, isLogged: true }));
  };
  //log out the user by cloning the actual user and updating the values
  const logOut = () => {
    setActualUser({ ...actualUser, email: "", password: "", isLogged: false, isAdmin: false });
    localStorage.removeItem("user");
  };
 

  //! -----------------  USE EFFECT -----------------------------------------
  //search for user in the localStrorage when the page is loaded and send it to the actual user and the database
  useEffect(() => {
    //saves the local storage user in the actual user
    if (localStorage.getItem("user")) {
      setActualUser(JSON.parse(localStorage.getItem("user")));
    }
    //saves the local storage database in the database
    if (localStorage.getItem("users")) {
      setUserDatabase(JSON.parse(localStorage.getItem("users")));
    }
    //saves the local storage colors in the database
    if (localStorage.getItem("colors")) {
      setUserDatabase(JSON.parse(localStorage.getItem("colors")));
    }
  }, []);	

  return (
    <GlobalContext.Provider
      value={{
        actualUser: actualUser,
        handleActualUser: handleActualUser,
        userDatabase: userDatabase,
        handleUserDatabase: handleUserDatabase,
        logOut: logOut,
        colorDataBase: colorDataBase,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
