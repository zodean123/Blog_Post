import {useState} from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  async function register(e){
    e.preventDefault();
  const response = await  fetch('http://localhost:4000/register',{
     method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify({
        username,
        password,
      })
    })
    const data  = await response.json()

    console.log(data);
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Register</button>
    </form>
  );
}