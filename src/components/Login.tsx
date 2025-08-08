import type React from "react";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login : React.FC = () => {
  const [isSingIn , setIsSignIn] = useState(true);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name , setName] = useState("")
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  const toggleSignIn = () => {
   setIsSignIn(!isSingIn)
  }

  const handle = async() => {
    console.log("handle called");
    
    if(!email || !password || (!isSingIn && !name)){
            setMessage("Please fill all fields");
      return;

    }
try {
  if(isSingIn){
    console.log(`signIn : Email : ${email} , password  : ${password}`);
    
    const response = await axios.post("http://localhost:3000/api/auth/login", {email , password}, {withCredentials : true});
    setMessage(response.data.message);
    navigate("/browse")
  }else{
    console.log("inside signup");
    console.log(`Email : ${email} , password  : ${password} name : ${name}`);
    await axios.post(
          "http://localhost:3000/api/auth/signup",
          { name, email, password },
          { withCredentials: true }
        );

        navigate("/browse");
  }
} catch (error : unknown) {
  console.log("error : ");
  
  console.error(error);
  if (axios.isAxiosError(error)) {
    setMessage(error.response?.data?.message || 'An error occurred');
  } else {
    setMessage('An unexpected error occurred');
  }
}
  }
  

return (
  <div className="w-full h-screen relative">

   <Header />

<img
alt="netflix bg Image"
src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
className="w-full h-screen object-cover"
/>

<div className="bg-black opacity-85 absolute top-[20%] left-4/12 flex items-center justify-center">

<form
  onSubmit={(e) => e.preventDefault()}
  className="w-[400px] p-8 text-white"
  >

 <h3 className="font-bold text-white text-4xl mb-8">Sign In</h3>

{!isSingIn &&   <input
  type="text"
  placeholder="Enter Your Name"
  className="w-full bg-gray-900 p-4 mb-4 rounded-lg border border-white"
 value={name}
  onChange={(e) => setName(e.target.value)}
 />}


  <input
  type="text"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email or Phone Number"
  className="w-full bg-gray-900 p-4 mb-4 rounded-lg border border-white"
  />


  <input
  type="password"
  placeholder="Password"
  className="w-full bg-gray-900 p-4  mb-6 rounded-lg border border-white"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  />

  <button 
  onClick={handle}
  className="w-full bg-red-700 py-4 my-6 rounded cursor-pointer">
   {isSingIn ? "Sign In" : "Sign Up" }
  </button>
  {message && <p className="text-red-500 mb-4">{message}</p>}


<p className="mt-2 text-gray-400 text-sm inline">
  {isSingIn ? "New to Netflix? " : "Already registered? "}
  <span
    onClick={toggleSignIn}
    className="text-white font-bold text-lg cursor-pointer"
  >
    {isSingIn ? "Sign Up Now" : "Sign In"}
  </span>
</p>


  </form>
 
</div>

  </div>
)


}

export default Login;