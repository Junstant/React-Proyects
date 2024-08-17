import React, {useEffect, useState} from "react";
import Layout from "./components/Layout.jsx";
import ColorsPalette from "./components/colorPalette/ColorsPalette.jsx";
import "./global.css";
import { useGlobalContext } from "./Context";
import { Sparkle, StarFour, Fire, Clover, Heart, Eye, BookmarkSimple } from "@phosphor-icons/react";
import "./app.css";

function App() {
  // call the colorDataBase from the context
  const { colorDataBase, tagsDataBase, sortTags, temporalSaveDatabase, copyToClipboard, changeSwitch, switches, savedPalettes, tagPaletteFilter, tagsFilteredDataBase, currentTitle, switchTitle} = useGlobalContext();

  //define the amount of tags to show
  const [tagsAmount, setTagsAmount] = useState(12);
  
  //give the 12 most popular tags
  let tags = sortTags(tagsDataBase).slice(0, tagsAmount);
  
  //show more tags
  const handleSeeMore = () => {
    setTagsAmount(prevAmount => prevAmount + 12); // Incrementar tagsAmount en 12
  };

  //show the collection or the colorDataBase?
  function collectionSwitch(){
    if(switches[3].state === true){
      return savedPalettes;
    } else {
      return colorDataBase;
    }
  }
 

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
                    <p onClick={() => tagPaletteFilter(colorDataBase, tag)}>{tag.tag}</p>
                  </span>
                ))}
                <div className="seeMoreApp">
                  <button onClick={handleSeeMore} ><Eye></Eye>See more...</button>
                </div>
            </div>
          </div>
          <div className="widOne">
            <h1 style={{ color: "#727C8F" }}>
            {switchTitle(currentTitle)}
            </h1>
            <ColorsPalette colors={tagsFilteredDataBase.length > 0 ? tagsFilteredDataBase : collectionSwitch()}/>
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
