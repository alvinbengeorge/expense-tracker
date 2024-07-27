"use client";
import { useState } from "react";
import { createUser, loginUser } from "./utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await loginUser(username, password);

      if (res.status === "error") {
        if (res.error === "User does not exist") {
          await createUser(username, password);
          const newRes = await loginUser(username, password);
          if (newRes.status === "success") {
            toast.success("User created and logged in successfully!");
            router.push("/dashboard");
          } else {
            toast.error(newRes.error || "User creation failed.");
          }
        } else {
          toast.error(res.error || "Login failed. Please try again.");
        }
      } else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10">
      <h1 className="text-3xl">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <label className="input input-bordered flex items-center gap-2">
          Username
          <input
            type="text"
            className="grow"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input
            type="password"
            className="grow"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-secondary">
          Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
