import React,{useState} from 'react'
import { useNavigate,NavLink } from "react-router-dom";
const Signup = () => {
  let Navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleinputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();

    const { name, email,phone,password, cpassword } = user;

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if ( data || res.status!== 422) {
      window.alert("successful data");
      console.log("successful registration");
      Navigate("/login");
    } else {
      window.alert("invalid data");
      console.log("invalid registration");
    }
  };
  return (
    <>
 <div className="divBox">
  <div class="container">
    <div class="header">Login</div>
    <form action="" method="post">
      <div class="field input-field">
        <input      type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleinputs}/>
        <label>name</label>
      </div>
      <div class="field input-field">
        <input type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleinputs}/>
        <label>Email Address</label>
      </div>
      <div class="field input-field">
        <input type="number"
                    name="phone"
                    id="phone"
                    placeholder=" Your number"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleinputs}/>
        <label>phone</label>
      </div>
      <div class="field input-field">
        <input type="password"
                    name="password"
                    id="password"
                    placeholder=" Your password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleinputs}/>
        <label>password</label>
      </div>
      <div class="field input-field">
        <input type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="Repeat your password"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleinputs}/>
        <label>Password</label>
      </div>
      <div class="field button-field">
      <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="register"
                    onClick={PostData}
                  />
      </div>
      <div class="form-link sign-up">
        <span>Already have an account?</span> <NavLink to="/auth/login">Login</NavLink>
      </div>
    </form>
  </div>
 </div>
    </>
  )
}

export default Signup
