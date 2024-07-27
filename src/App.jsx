import React from 'react'
import Layout from './components/Layout.jsx';
import ColorsPalette from './components/colorPalette/ColorsPalette.jsx';
import './global.css'
import { useGlobalContext } from "./Context";

function App() {
  const {colorDataBase} = useGlobalContext();
  return (
      <div>
          <Layout>
            <h1 style={{color:'#727C8F'}}>Latest!</h1>
            <ColorsPalette colors={colorDataBase}/>
          </Layout>
      </div> 
  )
}

export default App
