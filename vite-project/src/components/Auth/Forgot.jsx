import React,{useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../App";
const Forgot = () => {
    // ==========call usecontext =======
    const { dispatch } =  useContext(UserContext);
    let Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const ForgotUser = async (e) => {
      e.preventDefault();
      const res = await fetch("/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email
        }),
      });
    };
  return (
   <>
   <div className="divBox">
  <div class="container">
    <div class="header">Login</div>
    <form action="" method="post">
      <div class="field input-field">
        <input  type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
        <label>Email Address</label>
      </div>
      <div class="field button-field">
      <input
                    type="submit"
                    name="forgot"
                    id="forgot"
                    className="form-submit"
                    value="Send Email"
                    onClick={ForgotUser}
                  />
      </div>
    </form>
  </div>
 </div>
 </>
  )
}

export default Forgot
