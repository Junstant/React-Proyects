import React, { useState } from "react";
import "./AdminPanel.css";
import { useGlobalContext } from "../../Context";

const AdminPanel = () => {
  //use the context to get the values and call it from the context
  const { colorDataBase } = useGlobalContext();

  //set the initial state of the form
  const [formValues, setFormValues] = useState([
    '#000000',
    '#000000',
    '#000000',
    '#000000',
  ]);

  //function to handle the change of the values of the form
  const handleChangeFormValue = (e,index) => {
    const inputValue = e.target.value;
    const newFormValues = [...formValues];
    newFormValues[index] = inputValue;
    setFormValues(newFormValues);
  };

  return (
    <section className="fatherAP">
      <div className="childAP">
        <h1>Create new palette</h1>
        <p>Create a new palette and contribute to Color Palletio collection</p>
        <form className="formColorsAP">
            {formValues.map((color, index) => {
              return (
                <div key={index} className="inputChildAP">
                  <input 
                    type="color"
                    id={`color${index}`}
                    name={`color${index}`}
                    value={color}
                    onChange={(e) => handleChangeFormValue(e,index)}
                    className={`colorInputAP${index}`}
                  />
                  <input type="text" value={color} className="hexInputAP" onChange={(e) => handleChangeFormValue(e,index)}/>
                </div>
              );
            })}
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default AdminPanel;
