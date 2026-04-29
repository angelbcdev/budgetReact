import { Layout } from "../UI/Layout";







import { useState } from "react";
import { useNavigate } from "react-router";
import { settings } from "../api/index";

const Loging = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔐 fake validation (replace with API later)
    if (email === settings.email && password === settings.password) {
      // save session
      localStorage.setItem("user", JSON.stringify({ email }));

      // redirect
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Layout>
    <div className="flex items-center justify-center h-187.5 bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md w-80 flex flex-col gap-4 relative bottom-35"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded-lg"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg font-semibold"
        >
          Login
        </button>
      </form>
      </div>
    </Layout>
  );
};


export default Loging;
