import React, { useState, useContext } from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
import { UserContext } from "../../App";
const Auth = () => {
    // ==========call usecontext =======
    const { dispatch } = useContext(UserContext);

    let Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
  
    const LoginUser = async (e) => {
      e.preventDefault();
  
      const res = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await res.json();
  
      if (!data || res.status === 400) {
        window.alert("invalid hai bhai tu");
        console.log("invalid credentials");
      } else {
        dispatch({ type: "USER", payload: true });
        window.alert("perfect hai bhai tu");
        console.log("successful credentials");
       Navigate("/");
      }
    };
  return (
   <>
   <div className="divBox">
  <div class="container">
    <div class="header">Login</div>
    <form action="" method="POST">
      <div class="field input-field">
        <input  type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
        <label>Email Address</label>
      </div>
      <div class="field input-field">
        <input  type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}/>
        <label>Password</label>
      </div>
      <div class="form-link">
        <NavLink to="/auth/forgot" class="forgot-pass">Forgot password?</NavLink>
      </div>
      <div class="field button-field">
      <input
                    type="submit"
                    name="signin"
                    onClick={LoginUser}
                  />
      </div>
      <div class="form-link sign-up">
        <span>Don't have an account?</span> <NavLink to="/">Sign up now</NavLink>
      </div>
    </form>
  </div>
 </div>
 </>
  )
}

export default Auth
