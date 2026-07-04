import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-odoo-cream px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl shadow-odoo-purple/10 ring-1 ring-black/5 sm:p-8 md:p-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-odoo-purple sm:text-4xl">
            Welcome Back
          </h1>

          <p className="mt-3 text-odoo-muted">
            Sign in to access your workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <Input
            label="Email Address"
            name="email"
            type="email"
          />

          <Input
            label="Password"
            name="password"
            type="password"
          />

          <button
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-odoo-purple
              py-3
              font-semibold
              text-white
              transition
              hover:bg-odoo-purple-dark
              disabled:opacity-50
            "
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-odoo-muted">
          Don't have an account?{" "}
          <Link
            to="/getstarted"
            className="font-semibold text-odoo-purple hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

function Input({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-odoo-ink">
        {label}
      </label>

      <input
        name={name}
        type={type}
        className="
          w-full
          rounded-xl
          border
          border-gray-200
          px-4
          py-3
          outline-none
          transition
          focus:border-odoo-purple
          focus:ring-2
          focus:ring-odoo-purple/20
        "
      />
    </div>
  );
}
