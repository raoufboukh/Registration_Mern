import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3001/home").then((res) => {
      if (res.data !== "Success") {
        navigate("/login");
      }
    });
  });
  return <div className="text-4xl">Hello Mister</div>;
};

export default Home;
