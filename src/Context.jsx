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
  const [colorDataBase, setColorDataBase] = useState([
    {
      color: ["#17153B", "#2E236C", "#433D8B", "#C8ACD6"],
      likes: "594",
      time: "2024-03-05T02:39:56.410Z",
    },
    {
      color: ["#96B6C5", "#ADC4CE", "#EEE0C9", "#F1F0E8"],
      likes: "20252",
      time: "2024-01-02T02:39:56.410Z",
    },
    {
      color: ["#FFEECC", "#FFDDCC", "#FFCCCC", "#FEBBCC"],
      likes: "16250",
      time: "2022-07-23T02:39:56.410Z",
    },
    {
      color: ["#B5C0D0", "#CCD3CA", "#F5E8DD", "#EED3D9"],
      likes: "11302",
      time: "2019-04-29T02:39:56.410Z",
    },
    {
      color: ["#F1EAFF", "#E5D4FF", "#DCBFFF", "#D0A2F7"],
      likes: "9080",
      time: "2012-10-29T02:39:56.410Z",
    },
    {
      color: ["#FFD6BA", "#FFAAA6", "#FF8C94", "#FF6A8A"],
      likes: "6250",
      time: "2011-08-22T02:39:56.410Z",
    },
  ]);

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

  //trasnform time to hours, days, months, years
  const timeTransform = (time) => {
    const timeNow = new Date();
    const timePost = new Date(time);
    const timeDifference = timeNow - timePost;

    const units = [
      { label: "year", milliseconds: 31536000000 },
      { label: "month", milliseconds: 2592000000 },
      { label: "day", milliseconds: 86400000 },
      { label: "hour", milliseconds: 3600000 },
      { label: "minute", milliseconds: 60000 },
      { label: "second", milliseconds: 1000 },
    ];
    for (const unit of units) {
      const elapsed = Math.floor(timeDifference / unit.milliseconds);
      if (elapsed > 0) {
        return `${elapsed} ${unit.label}${elapsed > 1 ? "s" : ""}`;
      }
    }
    return "1 minute";
  };

  //update the color database and save it in the local storage
  const handleColorDataBase = (color) => {
    const time = new Date();
    const timeString = time.toISOString();
    console.log(time);
    const newColor = { color: color, likes: "0", time: timeString };
    setColorDataBase([...colorDataBase, newColor]);
    localStorage.setItem("colors", JSON.stringify([...colorDataBase, newColor]));
  };

  //update the likes of the color and save it in the local storage
  const handleLike = (i) => {
    const newColorDataBase = [...colorDataBase];
    newColorDataBase[i].likes = (parseInt(newColorDataBase[i].likes) + 1).toString();
    setColorDataBase(newColorDataBase);
    localStorage.setItem("colors", JSON.stringify(newColorDataBase));
  }

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
      setColorDataBase(JSON.parse(localStorage.getItem("colors")));
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
        handleColorDataBase: handleColorDataBase,
        handleLike: handleLike,
        timeTransform: timeTransform,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
