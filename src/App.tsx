import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/Browse";
import useUserStore from "./store/userStore";

function App() {
const isLoading = useUserStore((state) => state.isLoading);
  return (
    <>
   <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/browse" element={<Browse />} />
</Routes>


    </>
  );
}

export default App;