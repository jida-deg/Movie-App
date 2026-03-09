import { useContext } from "react";

import { FcGoogle } from "react-icons/fc";
import AuthContext from "../components/AuthProvider";

export default function GoogleLogin() {

  const { loginWithGoogle } = useContext(AuthContext);

  return (
    <div>

  <button 
      
  onClick={loginWithGoogle}
  style={{
    backgroundColor: "#fff",
    color: "#000",
    padding: "3px 10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginLeft: "65px",
    marginTop: "10px",
    fontWeight:'550',
  }}
  
>
  <FcGoogle size={24}  />
  Continue with Google
</button>

    </div>
  );
}