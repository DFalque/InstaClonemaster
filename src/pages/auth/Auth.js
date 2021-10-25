// LIBRARY
import React, { useState } from "react";
import "./Auth.sass";
// COMPONENTS
import Login from "../../components/auth/login/Index";
import Register from "../../components/auth/register/Index";

const Auth = () => {
  const [login, setLogin] = useState(false);

  // HANDLE STATE

  return (
    <div className="Auth">
      <h1>Identifícate</h1>
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </div>
  );
};

export default Auth;
