import { useState } from "react";
export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  async function register(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.status === 200) {
        setModalMessage('Registration successful');
        
      } else {
        setModalMessage('Registration failed');
      }
    } catch (err) {
      setModalMessage('Registration failed');
    }
    setShowModal(true);
  }

  return (
    <div className="register-form">
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Register</button>
      </form>

      {showModal && (
        <div className="modal" style={modalStyle}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyle = {
  display: 'block',
  position: 'fixed',
  zIndex: '1',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%) scale(0)',
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  maxWidth: '500px',
  width: '80%',
  animation: 'modalAppear 0.3s ease-out forwards',
};

const modalAppearAnimation = `
  @keyframes modalAppear {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  .modal-content {
    position: relative;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 24px;
    color: red;
    transition: 0.2s ease-in-out;
  }

  .close:hover {
    color: #000;
    transform: scale(1.5);
  }
`;

const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(modalAppearAnimation));
document.head.appendChild(styleElement);
