import type React from "react";
import Header from "./Header";
import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const Login : React.FC = () => {

const [isSingIn , setIsSignIn] = useState(true);
const [email, setEmail] = useState("mota@gmail.com");
const [password, setPassword] = useState("Mota@1234");
const [name , setName] = useState("")
const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const {addUser, setLoading} = useUserStore();
  const isLoading = useUserStore((state) => state.isLoading);

  const toggleSignIn = ()  => {
   setIsSignIn(!isSingIn)
  }

  const handle = async() : Promise<void> => {

    console.log("handle called");

    if(!email || !password || (!isSingIn && !name)){
            setMessage("Please fill all fields");
      return;
    }

try {
  setLoading(true);

  if(isSingIn){
    console.log(`signIn : Email : ${email} , password  : ${password}`);
    
    console.log("befor api call login");
    
    const response = await axios.post("http://localhost:3000/api/auth/login", 
      {email , password}, 
      {withCredentials : true});
console.log("after api login");

      console.log("galat pasword 1", response);
      
      if (!response) {
        console.log("galat pasword 2", response);
      }

      console.log("Login ho gya ",response );
      
const profileResponse = await axios.get(
          "http://localhost:3000/api/auth/profile",
          { withCredentials: true }
        );

        console.log("profile after login", profileResponse);
        console.log("user : ",profileResponse.data.user);
        
    addUser(profileResponse.data.user)
    setMessage(response.data.message);
    navigate("/browse");


  }else{
    console.log("inside signup");

    console.log(`Email : ${email} , password  : ${password} name : ${name}`);
   
  const signupResponse =  await axios.post(
          "http://localhost:3000/api/auth/signup",
          { name, email, password },
          { withCredentials: true }
        );

 console.log('Signup successful:', signupResponse.data);


   const profileResponse = await axios.get(
          "http://localhost:3000/api/auth/profile",
          { withCredentials: true }
        );     
        console.log('Profile fetched after signup:', profileResponse.data);

addUser(profileResponse.data.user)
navigate("/browse");

  }
} catch (error : unknown) {
  console.log("error : ", error);
  
  if (axios.isAxiosError(error)) {
    console.log("error inside axios", error);
    console.log("meesage :", );
    
    setMessage(error.response?.data?.message || 'An error occurred');
  } else {
    setMessage('An unexpected error occurred');
  }}

   finally{
   setLoading(false);
  }
  }
  
return (

  <div className="w-full h-screen relative">
    
   <Header />

<img
alt="netflix bg Image"
src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
className="absolute inset-0 w-full h-full object-cover -z-10"
/>

<div className="bg-black opacity-85 absolute top-[20%] left-4/12 flex items-center justify-center">

<form
  onSubmit={(e) => { 
    e.preventDefault();
    handle();
  }}
  className="w-[400px] p-8 text-white"
  >

 <h3 className="font-bold text-white text-4xl mb-8">
{  isSingIn ? "Sign In" : "Sign Up"}
</h3>

{!isSingIn &&   <input
  type="text"
  placeholder="Enter Your Name"
  className="w-full bg-gray-900 p-4 mb-4 rounded-lg border border-white"
 value={name}
  onChange={(e) => setName(e.target.value)}
 />}


  <input
  type="email"
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
  disabled={isLoading}
className="w-full bg-red-700 py-4 my-6 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
>

   {isLoading ? "Loading..." : isSingIn ? "Sign In" : "Sign up" }

  </button>


{message && (console.log("Render message:", message), <p className="text-red-500 mb-4">{message}</p>)}


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

// User clicks button → handle() starts.
// setLoading(true) → App.tsx shows "Loading..." → <Login> unmounted.
// API call fails → catch → setMessage("Wrong password").
// Component is unmounted, so message doesn’t show.
// finally → setLoading(false) → App.tsx mounts <Login> fresh → message reset