"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();SVGAnimatedInteger
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e:React.FormEvent) => {
    e.preventDefault()

    if (email == "") return toast.error("Email is required")
    if (password == "") return toast.error("Password is required")

    router.replace('/');
  }

  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="email"
        placeholder="Entre your Email"
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="password"
        placeholder="Entre your Password"
        value={password} onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold"
      >
        login
      </button>
    </form>
  );
};

export default LoginForm;
