import { useRef, type FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err) {
      alert("Bad credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        ref={emailRef}
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Email"
        className="mb-2 block"
      />
      <input
        ref={passwordRef}
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Password"
        className="mb-2 block"
      />
      <button type="submit">Login</button>
    </form>
  );
}
