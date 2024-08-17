import React, { createContext, useState, useContext, useEffect } from "react";
import { Check, Checks, StarFour, Fire, Clover, Heart, Sparkle } from "@phosphor-icons/react";
import {popularPaletteFilter, timePaletteFilter, randomPaletteFilter} from "./components/FunctionsHelpers/filters.js";
import hexaData from "./data/colordatabase.js";
import chatData from "./data/chatData.js";
import tagsData from "./data/tagsData.js";

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
  const [colorDataBase, setColorDataBase] = useState(hexaData);

  //chat database
  const [chatDataBase, setChatDataBase] = useState(chatData);

  // tags database
  const tagsDataBase = tagsData;

  //switches database
  const [switches, setSwtich] = useState([
    {
      name:"New",
      state: true,
    },
    {
      name:"Popular",
      state: false,
    },
    {
      name:"Random",
      state: false,
    },
    {
      name:"Collection",
      state: false,
    }]);

  //saved palettes database
  const [savedPalettes, setSavedPalettes] = useState([]);

  //tags filtered database
  const [tagsFilteredDataBase, setTagsFilteredDataBase] = useState([]);

  //current title of the home page
  const [currentTitle, setCurrentTitle] = useState('New');

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
  };

  //Handle search contact by id
  const handleSearchContact = (id) => {
    const contact = chatDataBase.find((contact) => contact.id === id);
    return contact;
  };

  //return the chat component
  const stateOfMessage = (message) => {
    if (message.state === "read") {
      return <Checks style={{ color: "var(--secondary)" }}></Checks>;
    } else if (message.state === "unread") {
      return <Checks style={{ color: "var(--primary)" }}></Checks>;
    } else if (message.state === "sending") {
      return <Check style={{ color: "var(--primary)" }}></Check>;
    } else {
      return <Check style={{ color: "var(--secondary)" }}></Check>;
    }
  };

  //handle chat database
  const handleChatDataBase = (chat) => {
    const chatIndex = chatDataBase.findIndex((item) => chat.id === item.id);
    console.log(chatIndex); 
    const newChatDataBase = [...chatDataBase];
    newChatDataBase[chatIndex] = chat;
    setChatDataBase([...newChatDataBase]);
    localStorage.setItem("chat", JSON.stringify(newChatDataBase));
  };

// Function to sort tags by popularity
const sortTags = (tags) => {
  return tags.sort((a, b) => b.popularity - a.popularity);
};

//set the temporal save of the colors
const [temporalSaveDatabase, setTemporalSave] = useState([]);

//Function to grab the 4 colors of a palette and render them in the saved palettes
const handleSave = (color) => {
  setTemporalSave([...temporalSaveDatabase, color]);
  setPopup({ visible: true, message: "Color added to Saved!" });
}

// Function to copy a color to the clipboard
const [popup, setPopup] = useState({ visible: false, message: "" });

function copyToClipboard(hex) {
  navigator.clipboard.writeText(hex);
  setPopup({ visible: true, message: `Copied ${hex} to clipboard!` });
}

//change the switch
function changeSwitch(name){
  //empty the tagsFilteredDataBase
  emptyTagsFilteredDataBase();
  const newSwitches = switches.map(item => {
    if(item.name === name){
      document.getElementById(name).classList.add("liActive");
      return {name: item.name, state: true};
    }else{
      document.getElementById(item.name).classList.remove("liActive");
      return {name: item.name, state: false};
    }
  });
  setSwtich(newSwitches);
  switchTitle(name);
  //corresponding function to the switch selected
  switch(name){
    case "New":
      timePaletteFilter(colorDataBase);
      break;
    case "Popular":
      popularPaletteFilter(colorDataBase);
      break;
    case "Random":
      randomPaletteFilter(colorDataBase);
      break;
}
}
 //Function to save the palettes in the saved palettes
  function handleSavePallete(color){
    setSavedPalettes([...savedPalettes, color]);
    setPopup({ visible: true, message: "Palette added to Colecction!" });
  }

// Function to filter the palettes by tags
function tagPaletteFilter(ColorsDataBase, tag) {
  // Assuming tag is an object, extract the value you need to compare
  const tagValue = tag.tag; // Ajusta esto según la estructura real de tu objeto tag
  // Filtrar el array ColorsDataBase
  const filteredArray = ColorsDataBase.filter((color) => {
      return color.tags && color.tags.includes(tagValue);
  });
  setTagsFilteredDataBase(filteredArray);
}

//function to empy the filtered palettes by tags if is not seen
function emptyTagsFilteredDataBase(){
  setTagsFilteredDataBase([]);
}

 //switch the title of the home page
 function switchTitle(caseType) {
   switch (caseType) {
     case 'New':
       return (
         <><StarFour /> New palettes</>);
     case 'Popular':
       return (<><Fire /> Popular palettes</>);
     case 'Random':
       return (<><Clover /> Random palettes</>);
     case 'Collection':
       return (<><Heart /> Collection palettes</>);
     default:
       return (<><Sparkle /> New palettes</>);
   }
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
    //saves the local storage chat in the database
    if (localStorage.getItem("chat")) {
      setChatDataBase(JSON.parse(localStorage.getItem("chat")));
    }
  }, []);

  //change the title of the home page when the switches change
  useEffect(() => {
    const activeSwitch = switches.find(switchItem => switchItem.state === true);
    if (activeSwitch) {
      setCurrentTitle(activeSwitch.name);
    }
  }, [switches]);

  //use effect to remove the popup after 2 seconds
useEffect(() => {
  if (popup.visible) {
    setTimeout(() => {
      setPopup({ visible: false, message: "" });
    }, 2000);
  }
}, [popup]);

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
        chatDataBase: chatDataBase,
        handleSearchContact: handleSearchContact,
        stateOfMessage: stateOfMessage,
        handleChatDataBase: handleChatDataBase,
        tagsDataBase: tagsDataBase,
        sortTags: sortTags,
        handleSave: handleSave,
        temporalSaveDatabase: temporalSaveDatabase,
        copyToClipboard: copyToClipboard,
        popup: popup,
        switches: switches,
        changeSwitch: changeSwitch,
        setSavedPalettes: setSavedPalettes,
        handleSavePallete: handleSavePallete,
        savedPalettes: savedPalettes,
        tagPaletteFilter: tagPaletteFilter,
        tagsFilteredDataBase: tagsFilteredDataBase,
        currentTitle: currentTitle,
        switchTitle: switchTitle,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
