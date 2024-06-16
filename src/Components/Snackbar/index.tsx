import React, { useEffect, useState } from "react";

interface SnackbarProps {
  message: string;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, duration = 3000 }) => {
  const [showSnackbar, setShowSnackbar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackbar(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      {showSnackbar && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md flex items-center">
          <svg
            className="h-6 w-6 text-green-400 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Snackbar;
