import React, {useEffect, useState} from "react";
import Layout from "./components/Layout.jsx";
import ColorsPalette from "./components/colorPalette/ColorsPalette.jsx";
import "./global.css";
import { useGlobalContext } from "./Context";
import { Sparkle, StarFour, Fire, Clover, Heart, Eye, BookmarkSimple } from "@phosphor-icons/react";
import "./app.css";

function App() {
  // call the colorDataBase from the context
  const { colorDataBase, tagsDataBase, sortTags, temporalSaveDatabase, copyToClipboard} = useGlobalContext();

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

  //change the switch
  function changeSwitch(name){
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
  }

  //give the 12 most popular tags
  const tags = sortTags(tagsDataBase).slice(0, 12);

  return (
    <div>
      <Layout>
        <section className="containerApp">
          <div className="leftContainer conStyleThree">
            <li onClick={() => changeSwitch("New")} id="New" className="liActive"><StarFour></StarFour> New</li>
            <li onClick={() => changeSwitch("Popular")} id="Popular"><Fire></Fire> Popular</li>
            <li onClick={() => changeSwitch("Random")} id="Random"><Clover></Clover> Random</li>
            <li onClick={() => changeSwitch("Collection")} id="Collection"><Heart></Heart> Collection</li>
            <div className="tagsApp">
              {tags.map((tag, index) => (
                  <span key={index}>
                    <a href="#">{tag.tag}</a>
                  </span>
                ))}
                <div className="seeMoreApp">
                  <button><Eye></Eye>See more...</button>
                </div>
            </div>
          </div>
          <div className="widOne">
            <h1 style={{ color: "#727C8F" }}>
              <Sparkle /> Newest palettes
            </h1>
            <ColorsPalette colors={colorDataBase} />
          </div>
          <div className="rightContainer conStyleThree">
            <h4><BookmarkSimple></BookmarkSimple> Saved</h4>
                <div className="colorSavCon">

                  {temporalSaveDatabase.map((color, index) => (
                    <div key={index} className="savedColors">
                      {color.color.map((hex, i) => (
                      
                        <div key={i} style={{ backgroundColor: hex }} className="colorSav" onClick={() => copyToClipboard(hex)}><span>{hex}</span></div>
                      ))}
                    </div>
                  ))}
                </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
export default App;
