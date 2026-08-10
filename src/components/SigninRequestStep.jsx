import "./SignIn.css";

function SigninRequestStep({ email }) {
  return (
    <div className="signin-page">

      <div className="signin-card">

        {/* Top loading animation */}
        <div className="top-loader top-loader-active" />

        <div className="signin-content">

          <div className="google-logo">
            Google
          </div>

          <h1 className="signin-title">
            Verify it's you
          </h1>

          <div className="account-pill">
            <span className="account-icon">
              👤
            </span>

            <span>
              {email}
            </span>
          </div>

          <div className="request-content">

            <div className="request-icon">
              ✓
            </div>

            <h2>
              Check your device
            </h2>

            <p>
              A sign-in request has been sent
              to your device.
            </p>

            <p>
              Open the notification and follow
              the instructions to continue.
            </p>

          </div>

          <div className="signin-actions">

            <button
              type="button"
              className="text-button"
            >
              Try another way
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SigninRequestStep;