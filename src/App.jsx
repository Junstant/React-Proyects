import React from "react";
import Layout from "./components/Layout.jsx";
import ColorsPalette from "./components/colorPalette/ColorsPalette.jsx";
import "./global.css";
import { useGlobalContext } from "./Context";
import { Sparkle } from "@phosphor-icons/react";
import "./app.css";

function App() {
  const { colorDataBase } = useGlobalContext();
  return (
    <div>
      <Layout>
        <section className="containerApp">
          <div className="leftContainer conStyleThree">hola</div>
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
