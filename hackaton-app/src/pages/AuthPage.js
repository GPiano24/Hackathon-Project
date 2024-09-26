import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"
import background from "../assets/Manulife.png"

const AuthPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  

  const navigate = useNavigate()

  const onButtonClick = () => {
    setError("")

    if(username === "" || password === ""){
      setError('Missing Fields')
      return
    }

    //Authentication calls here
    //Successful login
    navigate('/');
  }

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setError(''); // Clears the error
  };



  // return (
  //   <div className={"main-container"}>
  //     <div className={"inner-container"}>
  //       <img src={logo} alt="Manulife Logo"/> 

  //       <br/>

  //       <div className={'input-container'}>
  //         <p>Username</p>
  //         <input
  //             value={username}
  //             onChange={(ev) => setUsername(ev.target.value)}
  //             className={'inputBox'}
  //         />
  //       </div>

  //       <br/>

  //       <div className={'input-container'}>
  //         <p>Password</p>
  //         <input
  //             value={password}
  //             onChange={(ev) => setPassword(ev.target.value)}
  //             className={'inputBox'}
  //         />
  //       </div>

  //       <br/>

  //       <div>
  //         <label className={"errorLabel"}>{error}</label>
  //       </div>

  //       <br/>

  //       <div className={'button-container'}>
  //         <input className={'inputButton'} type="button" onClick={onButtonClick} value={'LOGIN'} />
  //       </div>

  //     </div>
  //   </div>
  // );

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${background})` }}
      />

      
      <div className="relative flex flex-col items-center justify-center h-3/5 w-1/3 bg-white rounded-2xl p-6 shadow-lg">
        <img src={logo} alt="Manulife Logo" className="mb-6" />

        <div className="w-2/3 flex flex-col items-start justify-center mb-4">
          <p className="text-base">Username</p>
          <input
            value={username}
            onChange={handleInputChange(setUsername)}
            className="h-12 w-full text-base rounded-md border border-black pl-2"
          />
        </div>

        <div className="w-2/3 flex flex-col items-start justify-center mb-4">
          <p className="text-base">Password</p>
          <input
            value={password}
            type="password"
            onChange={handleInputChange(setPassword)}
            className="h-12 w-full text-base rounded-md border border-black pl-2"
          />
        </div>


        {error && (
          <div>
            <label className="text-red-500 text-sm">{error}</label>
          </div>
        )}

        <div className="w-3/5 mt-4">
          <button className="w-full bg-gray-800 text-white py-3 rounded-md text-xl hover:bg-gray-700" onClick={onButtonClick}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;