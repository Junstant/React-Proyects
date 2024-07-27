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
        <form className="formColorsAP">
          <div className="inputFatherAP">
            {formValues.map((color, index) => {
              return (
                <div key={index} className="inputChildAP">
                  <label htmlFor={`color${index}`}>Color {index + 1}</label>
                  <input 
                    type="color"
                    id={`color${index}`}
                    name={`color${index}`}
                    value={color}
                    onChange={(e) => handleChangeFormValue(e,index)}
                  />
                  <input type="text" value={color} className="hexInputAP" onChange={(e) => handleChangeFormValue(e,index)}/>
                </div>
              );
            })}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default AdminPanel;
