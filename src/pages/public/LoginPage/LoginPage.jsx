import logo from "../../../assets/CS_Logo_web.png";
import { useRef, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext/AuthContext.js";
import axios from "@/api/axios.js";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const secretKey = "706b889da35c4992b71f439d3d70f19a";

const URL = "/api";

function LoginPage() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const { Auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let userData = {
        Method: "AuthenticateLogin",
        operatorID: user,
        Password: password,
      };

      const userDataString = JSON.stringify(userData);

      const encryptedData = CryptoJS.AES.encrypt(
        userDataString,
        secretKey
      ).toString();

      let newUserData = {
        Method: "AuthenticateLogin",
        StringData: encryptedData,
      };
      //   console.log(encryptedData);

      const response = await axios.post(URL, newUserData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        let responseData = response.data;
        const encryptedResponseData = response.data.StringData;

        // Decrypt the response data
        const bytes = CryptoJS.AES.decrypt(encryptedResponseData, secretKey);
        const decryptedResponseData = bytes.toString(CryptoJS.enc.Utf8);

        responseData = JSON.parse(decryptedResponseData);

        console.log(responseData);

        if (responseData[0]?.Status[0] == 1) {
          localStorage.setItem("isAuthenticated", "true");
          //console.log("test", localStorage.getItem("isAuthenticated"));
          toast.success("Login Success", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
          // console.log('before',JSON.stringify(responseData));
          setAuth(JSON.stringify(responseData));
          // console.log('after',JSON.stringify(responseData));
          navigate("/dashboard");
        } else {
          setError("Invalid User");
          toast.error("Invalid UserID or Password", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
        }
        // setResponseMessage(`Response Data: ${JSON.stringify(responseData)}`);
      } else {
        setError(`Request failed with status ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }

    setSuccess(true);
    setPassword("");
    setUser("");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-3/6 flex">
          <div className="w-2/4 flex items-center justify-center">
            {" "}
            {/* Centered the image */}
            <img
              src={logo}
              alt="Logo"
              className="max-w-full max-h-full"
              width={200}
              height={200}
            />
          </div>
          <div className="w-0.5 bg-gray-300 h-60 my-2 mx-4"></div>
          <div className="w-2/4 pl-8">
            <h2 className="text-xl text-center sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-700 mb-4">
              Login
            </h2>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium">
                Login ID
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded w-full py-2 px-3"
                placeholder="Enter your Login ID"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                className="border border-gray-300 rounded w-full py-2 px-3"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-primary text-white rounded-md w-full py-2"
              onClick={handleClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
