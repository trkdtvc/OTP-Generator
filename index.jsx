const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
  const [countdown, setCountdown] = useState(null);
  const [otpCode, setOTPCode] = useState(null);
  const [ctaDisabled, setCTADisabled] = useState(false);
  const timerRef = useRef(null);

  const otpButtonHandler = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setOTPCode(Math.floor(100000 + Math.random() * 900000));
    setCountdown(5);
    setCTADisabled(true);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setCTADisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>

      <h2 id="otp-display">
        {!!otpCode ? otpCode : "Click 'Generate OTP' to get a code"}
      </h2>

      <p id="otp-timer" aria-live="assertive">
        {countdown === null
          ? ""
          : countdown > 0
            ? `Expires in: ${countdown} seconds`
            : "OTP expired. Click the button to generate a new OTP."}
      </p>

      <button
        id="generate-otp-button"
        onClick={otpButtonHandler}
        disabled={ctaDisabled}
      >
        Generate OTP
      </button>
    </div>
  );
};
