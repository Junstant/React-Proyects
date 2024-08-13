import React, { useState } from "react";
import "./colorsPalette.css";
import { Heart } from "@phosphor-icons/react";
import { useGlobalContext } from "../../Context";

const ColorsPalette = (props) => {
  const array = props.colors;
  const [popup, setPopup] = useState({ visible: false, message: "" });

  // Function to copy the hex to the clipboard
  function copyToClipboard(hex) {
    navigator.clipboard.writeText(hex);
    setPopup({ visible: true, message: `Copied ${hex} to clipboard!` });

    // Hide the popup after 2 seconds
    setTimeout(() => {
      setPopup({ visible: false, message: "" });
    }, 2000);
  }

  // Function to handle the like of the color
  const { handleLike, timeTransform } = useGlobalContext();

  return (
      <section className="palette">
        {/* Map the array */}
        {array.map((actualColor, i) => (
          <div className="fatherCon" key={actualColor + i}>
            {/* Map the palette */}
            <div className="colorPalette">
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
