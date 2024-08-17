import React, { createContext, useState, useContext, useEffect } from "react";
import { Check, Checks } from "@phosphor-icons/react";
import {popularPaletteFilter, timePaletteFilter, randomPaletteFilter} from "./components/FunctionsHelpers/filters.js";

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
      tags: ["Pastel", "Neon", "Dark", "Warm"],
    },
    {
      color: ["#96B6C5", "#ADC4CE", "#EEE0C9", "#F1F0E8"],
      likes: "20252",
      time: "2024-01-02T02:39:56.410Z",
      tags: ["Cold", "Bright", "Soft", "Retro"],
    },
    {
      color: ["#FFEECC", "#FFDDCC", "#FFCCCC", "#FEBBCC"],
      likes: "16250",
      time: "2022-07-23T02:39:56.410Z",
      tags: ["Vintage", "Modern", "Warm", "Soft"],
    },
    {
      color: ["#B5C0D0", "#CCD3CA", "#F5E8DD", "#EED3D9"],
      likes: "11302",
      time: "2019-04-29T02:39:56.410Z",
      tags: ["Cold", "Bright", "Soft", "Retro"],
    },
    {
      color: ["#F1EAFF", "#E5D4FF", "#DCBFFF", "#D0A2F7"],
      likes: "9080",
      time: "2012-10-29T02:39:56.410Z",
      tags: ["Vintage", "Modern", "Warm", "Soft"],
    },
    {
      color: ["#FFD6BA", "#FFAAA6", "#FF8C94", "#FF6A8A"],
      likes: "6250",
      time: "2011-08-22T02:39:56.410Z",
      tags: ["Cold", "Bright", "Soft", "Retro"],
    },
  ]);

  //chat database
  const [chatDataBase, setChatDataBase] = useState([
    {
      name: "Messi",
      thumbnail: "https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg",
      lastConnection: "2024-03-01T02:39:56.410Z",
      id: 0,
      messages: [
        {
          author: "Messi",
          text: "Can you return to me the facha maestro?",
          time: "2024-03-05T02:39:56.410Z",
          id: 1,
          state: "read",
        },
        {
          author: "Me",
          text: "I will return it to you if you return to Barcelona",
          time: "2024-03-05T02:39:56.410Z",
          id: 2,
          state: "read",
        },
      ],
    },
    {
      name: "Granny",
      thumbnail: "/abuelita.jpg",
      lastConnection: "2024-07-29T02:39:56.410Z",
      id: 1,
      messages: [
        {
          author: "Granny",
          text: 'Do not open the door to the "ven a mi abuelita" guyssssssssssss',
          time: "2024-07-29T02:39:56.410Z",
          id: 1,
          state: "unread",
        },
      ],
    },
    {
      name: "Ven a mi abuelita guy",
      thumbnail: "/venami.jpg",
      lastConnection: "2024-07-29T02:39:56.410Z",
      id: 2,
      messages: [
        {
          author: "Ven a mi abuelita guy",
          text: "Open the door granny, I have a surprise for you 🥵🍆",
          time: "2024-07-29T02:39:56.410Z",
          id: 1,
          state: "read",
        },
        {
          author: "Me",
          text: "Wrong chat, im the grandson",
          time: "2024-07-29T02:39:56.410Z",
          id: 2,
          state: "sent",
        },
      ],
    },
    {
      name: "Moto moto",
      thumbnail: "https://i1.sndcdn.com/artworks-rhpmUzVPgtR2OHPS-0NncKA-t500x500.jpg",
      lastConnection: "2024-07-29T02:39:56.410Z",
      id: 3,
      messages: [
        {
          author: "Moto moto",
          text: "I like them big, I like them chunky - Palabras de GitHub Copilot",
          time: "2024-07-29T02:39:56.410Z",
          id: 1,
          state: "read",
        },
        {
          author: "Me",
          text: "I like them round, I like them plumpy",
          time: "2024-07-29T02:39:56.410Z",
          id: 2,
          state: "delivered",
        },
      ],
    },
  ]);

  // tags database
  const tagsDataBase = [
    { tag: "Pastel", popularity: 10},
    { tag: "Neon", popularity: 5},
    { tag: "Dark", popularity: 6},
    { tag: "Warm", popularity: 4},
    { tag: "Cold", popularity: 1},
    { tag: "Bright", popularity: 8},
    { tag: "Soft", popularity: 7},
    { tag: "Retro", popularity: 9},
    { tag: "Vintage", popularity:7},
    { tag: "Modern", popularity: 3},
  ];

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
const [temporalSaveDatabase, setTemporalSave] = useState([{ color: ["#17153B", "#2E236C", "#433D8B", "#C8ACD6"] }]);

//Function to grab the 4 colors of a palette and render them in the saved palettes
const handleSave = (color) => {
  setTemporalSave([...temporalSaveDatabase, color]);
}

// Function to copy a color to the clipboard
const [popup, setPopup] = useState({ visible: false, message: "" });

function copyToClipboard(hex) {
  navigator.clipboard.writeText(hex);
  setPopup({ visible: true, message: `Copied ${hex} to clipboard!` });

  // Hide the popup after by removing the class
  setTimeout(() => {
    setPopup({ visible: false, message: "" });
  }, 2000);
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
