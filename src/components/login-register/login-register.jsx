import React, { useState, useEffect } from "react";
import "./login-register.css";
import { useGlobalContext } from "../../Context";

const loginRegister = () => {
  //use the context to get the values and call it from the context
  const { userDatabase, handleUserDatabase, handleActualUser, actualUser } = useGlobalContext();

  //set the inital state of the values from the form
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    isLoggin: false,
  });
  
  //useEffect to check if the user is logged and redirect to the home page
  useEffect(() => {
    if (actualUser.isLogged) {
      window.location.href = "/";
    }
  }, [actualUser]);

  //capture the values on change on every input and clone the initial state and update the values and check if is login or register
  const handleChangeFormValue = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    if (e.target.type === "checkbox") {
      if (e.target.checked === true) {
        setFormValues({ ...formValues, isLoggin: true });
      }
      else {
        setFormValues({ ...formValues, isLoggin: false });
      }
    } else {
      //clone the initial state and update each value capturing the name of the input and the value
      setFormValues({ ...formValues, [inputName]: inputValue });
    }
  };

  //function to login, search the database for the user and if it exists, update the actual user sending the values to the context
  const login = () => {
    const userDb = userDatabase.find((user) => user.email === formValues.email && user.password === formValues.password);
    if (userDb) {
      handleActualUser(userDb);
    } else {
      alert("User not found");
    }
  };

  //function to register search if the user exists and if not, add it to the database
  const register = () => {
    const userDb = userDatabase.find((user) => user.email === formValues.email);
    if (userDb) {
      alert("User already exists");
    } else {
      handleUserDatabase(formValues.email, formValues.password);
      alert("User created");
    }
  };
    //handle the submit and send the values to the context (actual)
    const handleSubmit = (e) => {
      e.preventDefault();
      if (formValues.isLoggin === true) {
        login();
      } else {
        register();
      }
    };

    return (
      <section className="fatherLR">
        <div className="childLR">
          <h1>Login or Register</h1>
          <form className="formLoginRegisterLR" onSubmit={handleSubmit}>
            <input required name="email" placeholder="Email" type="email" onChange={handleChangeFormValue} />
            <input required name="password" placeholder="Password" type="password" onChange={handleChangeFormValue} />
            <div className="checkConLR">
              <input name="checkbox" id="check" type="checkbox" onChange={handleChangeFormValue} />
              <label htmlFor="check">Already have account? </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    );
  };
export default loginRegister;
