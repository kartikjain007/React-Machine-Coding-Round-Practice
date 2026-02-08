import { useRef, useState } from "react";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const TimerRef = useRef({});
  const handleClose = (id) => {
    clearTimeout(TimerRef.current[id]);
    delete TimerRef.current[id];
    setToasts((prevToasts) => {
      const filteredArr = prevToasts.filter((toast) => {
        return toast.id !== id;
      });

      return filteredArr;
    });
  };

  const handleAdd = (message, type) => {
    const id = new Date().getTime();
    const newToast = [...toasts, { id, message, type }];
    setToasts(newToast);
    TimerRef.current[id] = setTimeout(() => handleClose(id), 5000);
  };

  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map(({ id, message, type }) => {
          return (
            <div key={id} className={`toast ${type}`}>
              {message} <span onClick={() => handleClose(id)}>x</span>
            </div>
          );
        })}
      </div>
      <div className="btn-container">
        <button onClick={() => handleAdd("Success", "success")}>
          Success Toast
        </button>
        <button onClick={() => handleAdd("Info", "info")}>Info Toast</button>
        <button onClick={() => handleAdd("Warning", "warning")}>
          Warning Toast
        </button>
        <button onClick={() => handleAdd("Error", "error")}>Error Toast</button>
      </div>
    </div>
  );
}
