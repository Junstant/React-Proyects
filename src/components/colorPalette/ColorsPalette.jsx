import React, { useState } from "react";
import "./colorsPalette.css";
import { Heart, Eyes, Plus, BookmarkSimple } from "@phosphor-icons/react";
import { useGlobalContext } from "../../Context";

// Component to show the colors palette
const ColorsPalette = (props) => {
  const array = props.colors;

  // Function to handle the like of the color
  const { handleLike, timeTransform, handleSave, popup, copyToClipboard, handleSavePallete } = useGlobalContext();

  return (
      <section className="palette">
        {/* Map the array */}
        {array.map((actualColor, i) => (
          <div className="fatherCon" key={actualColor + i}>
            {/* Map the palette */}
            <div className="colorPalette">
                <div className="buttonsPal">
                  <button><Eyes></Eyes></button>
                  <button onClick={() => handleSave(array[i])}><Plus></Plus></button>
                  <button onClick={() => handleSavePallete(array[i])}><BookmarkSimple></BookmarkSimple></button>
                </div>
              {actualColor.color.map((hex, i) => (
                <div className="colorCon" onClick={() => copyToClipboard(hex)} style={{ backgroundColor: hex }} key={hex + i}>
                  <span className="colorTitle" onClick={() => copyToClipboard(hex)}>
                    {hex}
                  </span>
                </div>
              ))}
            </div>
            <div className="info">
              <span className="likes" onClick={() => handleLike(i)}>
                <Heart /> {actualColor.likes} likes
              </span>
              <span className="time">{timeTransform(actualColor.time)} ago</span>
            </div>
          </div>
        ))}
        {/* Pop-up */}
        {popup.visible && <div className="popup">{popup.message}</div>}
      </section>
  );
};

export default ColorsPalette;
