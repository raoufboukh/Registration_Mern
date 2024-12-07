import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <div className="flex justify-center items-center bg-black h-screen">
      <div className="w-[500px] shadow-md  shadow-gray-500  rounded-md text-white">
        <h1 className="text-center text-3xl">Login</h1>
        <form
          action=""
          className="px-16 py-5"
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post("http://localhost:3001/login", { email, pass })
              .then((res) => {
                console.log(res.data);
                if (res.data === "Success") {
                  navigate("/dashboard");
                  enqueueSnackbar("Logged in successfully", {
                    variant: "success",
                  });
                }
              });
          }}
        >
          <div>
            <label className="block w-fit" htmlFor="email">
              Email
            </label>
            <input
              className="bg-black border rounded-md outline-none border-gray-500 p-1 text-lg px-2 my-3 w-full"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block w-fit" htmlFor="pass">
              Password
            </label>
            <input
              className="bg-black border rounded-md outline-none border-gray-500 p-1 text-lg px-2 my-3 w-full"
              type="password"
              id="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-gray-500 px-4 py-2 rounded-md mx-auto block w-fit"
          >
            Login
          </button>
          <p className="text-center block my-3">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="underline hover:text-gray-500 transition-all"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
