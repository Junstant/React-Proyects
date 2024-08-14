import React, {useEffect} from "react";
import Layout from "./components/Layout.jsx";
import ColorsPalette from "./components/colorPalette/ColorsPalette.jsx";
import "./global.css";
import { useGlobalContext } from "./Context";
import { Sparkle, StarFour, Fire, Clover, Heart } from "@phosphor-icons/react";
import "./app.css";

function App() {
  // call the colorDataBase from the context
  const { colorDataBase, tagsDataBase, sortTags} = useGlobalContext();

  useEffect(() => {
    // add event listener to the leftContainer links to change the active class and remove it from the other links
    const leftContainer = document.querySelector(".leftContainer");
    const handleClick = (e) => {
      // Check if the clicked element is a list item
      if (e.target.tagName === 'LI' || e.target.closest('li')) {
        const clickedLi = e.target.tagName === 'LI' ? e.target : e.target.closest('li');
        const links = leftContainer.querySelectorAll('li');
        links.forEach((link) => {
          link.classList.remove("liActive");
        });
        clickedLi.classList.add("liActive");
      }
    };
    leftContainer.addEventListener("click", handleClick);
    // Cleanup event listener on component unmount
    return () => {
      leftContainer.removeEventListener("click", handleClick);
    };
  }, []);
  
  //give the 12 most popular tags
  const tags = sortTags(tagsDataBase).slice(0, 12);

  return (
    <div>
      <Layout>
        <section className="containerApp">
          <div className="leftContainer conStyleThree">
            <li className="liActive"><StarFour></StarFour> New</li>
            <li><Fire></Fire> Popular</li>
            <li><Clover></Clover> Random</li>
            <li><Heart></Heart> Collection</li>
            <div className="tagsApp">
              {tags.map((tag, index) => (
                  <span key={index}>
                    <a href="#">{tag.tag}</a>
                  </span>
                ))}
            </div>
          </div>
          <div className="widOne">
            <h1 style={{ color: "#727C8F" }}>
              <Sparkle /> Newest palettes
            </h1>
            <ColorsPalette colors={colorDataBase} />
          </div>
          <div className="rightContainer conStyleThree">hola</div>

        </section>
      </Layout>
    </div>
  );
}
export default App;
