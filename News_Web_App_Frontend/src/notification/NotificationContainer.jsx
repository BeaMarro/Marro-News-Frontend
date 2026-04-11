import React, { useState, useEffect } from "react";
import Toast from 'react-bootstrap/Toast';
import '../styles/NotificationContainer.css';

function NotificationContainer({ notification }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Toast className="notification" show={show} onClose={() => setShow(false)}>
      <Toast.Body><b>New Notification!</b></Toast.Body>
      <Toast.Body>{notification}</Toast.Body>
    </Toast>
  );
}

export default NotificationContainer;
