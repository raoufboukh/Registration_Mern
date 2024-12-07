import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center bg-black h-screen">
      <div className="w-[500px] shadow-md  shadow-gray-500  rounded-md text-white">
        <h1 className="text-center text-3xl">Login</h1>
        <form action="" className="px-16 py-5">
          <div>
            <label className="block w-fit" htmlFor="email">
              Email
            </label>
            <input
              className="bg-black border rounded-md outline-none border-gray-500 p-1 text-lg px-2 my-3 w-full"
              type="email"
              id="email"
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
