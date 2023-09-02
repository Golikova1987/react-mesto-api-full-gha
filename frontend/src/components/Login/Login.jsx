import React from "react";
import useFormValidation from "../../utils/useFormValidation.js";

export default function Login({ handleLogin }) {

  const { value, error, reset, handleChange, isInputValid } = useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();
    handleLogin({
      email: value.email,
      password: value.password
    }, reset);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form 
        className="auth__form"
        onSubmit={handleSubmit}
        >
        <input 
          className={`popup__input ${isInputValid.email === undefined || isInputValid.email ? '' : 'popup__input_error'}`} 
          name="email"
          type="email" 
          placeholder="Email"
          value={value.email ? value.email : ""}
          onChange={handleChange}
          minLength={2}
          maxLength={40}
          required
        />
        <span className="popup__error">{error.email}</span>
        <input 
          className={`popup__input ${isInputValid.password === undefined || isInputValid.password ? '' : 'popup__input_error'}`}
          name="password"
          type="password" 
          placeholder="Пароль"
          minLength={2}
          maxLength={200}
          value={value.password ? value.password : ""}
          onChange={handleChange}
          required
        />
        <span className="popup__error">{error.password}</span>
        <button className="auth__submit" type="submit">Войти</button>
      </form>
    </div>
  )
}




// import React, { useState } from "react";
// // import useFormValidation from "../../utils/useFormValidation.js";

// export default function Login({ onLogin }) {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // const { value, error, isValid, isInputValid } = useFormValidation();

//   // function onLogin(event) {
//   //   event.preventDefault()
//   //   handleLogin(value.password, value.email)
//   // }

//   function handleChangeEmail(event) {
//     setEmail(event.target.value);
//   }

//   function handleChangePassword(event) {
//     setPassword(event.target.value)
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     onLogin(email, password);
//   }

//   return (
//     <div className="auth">
//       <h2 className="auth__title">Вход</h2>
//       <form 
//         className="auth__form"
//         onSubmit={handleSubmit}
//         // isValid={isValid}
//         >
//         <input 
//           className="auth__input" 
//           name="email"
//           type="email" 
//           placeholder="Email"
//           value={email}
//           onChange={handleChangeEmail}
//           // isInputValid={isInputValid.email} 
//           // error={error.email}
//           required
//           />
//         <input 
//           className="auth__input"
//           name="password"
//           type="password" 
//           placeholder="Пароль"
//           minLength={3}
//           value={password}
//           onChange={handleChangePassword}
//           // isInputValid={isInputValid.password} 
//           // error={error.password}
//           required
//           />
//         <button className="auth__submit" type="submit">Войти</button>
//       </form>
//     </div>
//   )
// }