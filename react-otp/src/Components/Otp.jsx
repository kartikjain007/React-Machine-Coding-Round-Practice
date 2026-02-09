import { useEffect, useRef, useState } from "react";

export default function Otp({ otpLength = 6 }) {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);
  //   console.log(otpFields);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    //shallow copying
    const copyFields = [...otpFields];

    if (key === "ArrowLeft") {
      if (index > 0) ref.current[index - 1].focus();
    }
    if (key === "ArrowRight") {
      if (index + 1 < otpLength) ref.current[index + 1].focus();
    }

    if (key === "Backspace") {
      copyFields[index] = "";
      setOtpFields(copyFields);
      if (index > 0) ref.current[index - 1].focus();
      return;
    }

    if (isNaN(key)) {
      return;
    }

    copyFields[index] = key;
    setOtpFields(copyFields);
    if (index + 1 < otpLength) ref.current[index + 1].focus();
  };

  useEffect(() => {
    ref.current["0"].focus();
  }, []);

  return (
    <div className="container">
      {otpFields.map((value, index) => {
        return (
          <input
            key={index}
            value={value}
            type="text"
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(currentInput) => (ref.current[index] = currentInput)}
          />
        );
      })}
    </div>
  );
}
