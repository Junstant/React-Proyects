import React from "react";
import "./colorsPalette.css";
import { Heart } from "@phosphor-icons/react";

const ColorsPalette = (props) => {
  const array = props.colors;

  function copyToClipboard(hex) {
    console.log(hex); 
    navigator.clipboard.writeText(hex);
  } 

  return (
    <section className="palette">
    {/* Map the array */}
      {array.map((actualColor, i) => (
        <div className="fatherCon" key={actualColor + i}>
          {/* Map the palette */}
          <div className="colorPalette">
          {actualColor.color.map((hex, i) => (
              <div className="colorCon" onClick={() => copyToClipboard(hex)} style={{ backgroundColor: hex }} key={hex + i}>
                <span className="colorTitle" onClick={() => copyToClipboard(hex)} >{hex}</span>
              </div>
          ))}
          </div>
          <div className="info">
            <span className="likes">
              <Heart/> {actualColor.likes} likes
            </span>
            <span className="time">{actualColor.time} ago</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ColorsPalette;
