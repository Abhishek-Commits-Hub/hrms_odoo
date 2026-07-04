import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      company_name: form.get("company_name") as string,
      name: `${form.get("first_name")} ${form.get("last_name")}`.trim(),
      email: form.get("email") as string,
      phone: form.get("phone_number") as string,
      role: (form.get("role") as string).toLowerCase(),
      password: form.get("password") as string,
      confirm_password: form.get("password") as string,
    };

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("Register response:", data);

      if (res.ok) {
        navigate("/login");
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
      <div className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-2xl shadow-odoo-purple/10 ring-1 ring-black/5 sm:p-8 md:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-odoo-purple sm:text-4xl">
            Create Employee Account
          </h1>

          <p className="mt-3 text-odoo-muted">
            Register as an admin or HR.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Input label="Company Name" name="company_name" />
            <Input label="Role" name="role" placeholder="HR / ADMIN" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input label="First Name" name="first_name" />
            <Input label="Last Name" name="last_name" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input label="Email" name="email" type="email" />
            <Input label="Phone Number" name="phone_number" />
          </div>

          <Input label="Password" name="password" type="password" />

          <button
            disabled={loading}
            className="
              mt-4
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
            {loading ? "Registering…" : "Register Employee"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-odoo-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-odoo-purple hover:underline"
          >
            Sign in
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
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-odoo-ink">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
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

