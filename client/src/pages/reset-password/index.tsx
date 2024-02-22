import React, { useState } from "react";
import OtpInput from "./components/otp";
import PasswordUpdated from "./components/password_updated";
import ResetPassword from "./components/reset_password";
import ValidateEmail from "./components/validate-emal";

function Index() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <ValidateEmail handleNextStep={() => handleNextStep()} />;
      case 2:
        return <OtpInput handleNextStep={() => handleNextStep()} />;
      case 3:
        // @ts-ignore
        return <ResetPassword handleNextStep={() => handleNextStep()} />;
      case 4:
        return <PasswordUpdated />;
      default:
        return null;
    }
  };
  return (
    // <div className="h-screen">
    //   <div className="flex flex-col items-center justify-center h-screen ">
    //     {renderStepContent()}
    //   </div>
    // </div>
    <OtpInput />
  );
}

export default Index;
