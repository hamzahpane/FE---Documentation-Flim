import React from "react"; // Pastikan import React
import Logo from "../assets/Logo.png";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { LoginApi } from "./redux/Feture/libs/LoginPage//Statelogin";
import { useNavigate } from "react-router-dom";
import { signInRequest } from "./redux/Feture/libs/LoginPage/defnition";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
    <div className="bg-gray-900 w-80 p-4 rounded shadow-md">
      <p className="text-white font-oldStandard">
        {message} Check your username and password again
      </p>
      <button
        className="mt-4 bg-yellow-300 w-24 px-2 py-2 rounded font-oldStandard"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState<signInRequest>({
    username: "",
    password: "",
    expiresInMins: 60,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      await LoginApi(loginValue);
      navigate("/Dasbord"); // Ganti dengan rute yang sesuai setelah login berhasil
    } catch (err: any) {
      setError(err.message); // Tangani kesalahan dan tampilkan pesan
    }
  };

  const handleCloseModal = () => {
    setError(""); // Reset error message saat modal ditutup
  };

  return (
    <div className="w-full md:w-1/3 bg-black justify-center border p-3 rounded-xl shadow-yellow mx-3">
      <div className="flex items-center justify-center gap-2">
        <img src={Logo} alt="" className="w-13 h-12" />
        <h1 className="text-center text-white text-2xl font-oldStandard font-bold">
          CineMagic
        </h1>
      </div>
      <h2 className="text-gray-100 font-oldStandard mt-3 mx-2 text-center">
        Explore the world of film and discover stories that will change your
        perspective
      </h2>
      <form onSubmit={handleLogin}>
        <div className="mx-2 mt-4">
          <label className="text-gray-300 font-oldStandard text-base block mb-2">
            Username
          </label>
          <input
            type="username"
            name="username" // Menyelaraskan dengan signInRequest
            placeholder="Enter Your Email"
            value={loginValue.username}
            onChange={handleChange}
            className="w-full p-1.5 rounded-md border font-oldStandard bg-black text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
            required
          />

          <label className="text-gray-300 font-oldStandard mt-4 text-base block mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password" // Menyelaraskan dengan signInRequest
              placeholder="Enter Your Password"
              value={loginValue.password}
              onChange={handleChange}
              className="w-full p-1.5 rounded-md border font-oldStandard bg-black text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <AiFillEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="border-white w-full mx-2 p-1.5 rounded-xl text-white bg-yellow-300"
          >
            <h1 className="text-black text-base font-oldStandard font-semibold">
              Sign In Your Account
            </h1>
          </button>
        </div>
      </form>
      <h1 className="text-center text-white mt-5 font-oldStandard">OR</h1>

      <div className="flex justify-center mt-4 mb-5">
        <button className="border w-full mx-2 p-1.5 rounded-xl text-white bg-black">
          <h1 className="text-white text-base font-oldStandard font-semibold">
            Register Your Account
          </h1>
        </button>
      </div>

      {error && <Modal message={error} onClose={handleCloseModal} />}
    </div>
  );
};

export default LoginForm;
