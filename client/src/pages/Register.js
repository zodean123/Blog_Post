import {useState} from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  async function register(e){
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:4000/register',{
        method:'POST',
         headers:{
           'Content-type':'application/json',
         },
         body:JSON.stringify({
           username,
           password,
         })
       })
       if(response.status === 200){
        alert('registration successful');
       }
       else{
        alert("registration failed");
       }
    }catch(err){
      alert('Registration failed');
    }
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