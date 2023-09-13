import React, { useEffect, useRef } from "react";
// import "./ProgressBar.css"; // Importing the CSS

const ProgressBar = ({ progress }) => {
  const progressRef = useRef(null);

  useEffect(() => {
    // Initially set the width to 0 and opacity to 0
    progressRef.current.style.width = "0%";
    progressRef.current.style.opacity = "0";
    
    // Use setTimeout to apply the transition effect
    setTimeout(() => {
      progressRef.current.style.width = `${progress}%`;
      progressRef.current.style.opacity = "1";
    }, 300); // This delay should match the transition delay in your CSS
  }, [progress]);

  return (
    <div className="progress my-1">
      <div ref={progressRef} className="progress-done" data-done={progress}>
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
