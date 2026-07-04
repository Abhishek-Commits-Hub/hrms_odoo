import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="min-h-screen bg-odoo-cream flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-10 shadow-2xl shadow-odoo-purple/10 ring-1 ring-black/5">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-odoo-purple">
            Welcome Back
          </h1>

          <p className="mt-3 text-odoo-muted">
            Sign in to access your workspace.
          </p>
        </div>

        <form className="mt-8 grid gap-5">
          <Input
            label="Email Address"
            type="email"
          />

          <Input
            label="Password"
            type="password"
          />

          <button
            className="
              rounded-xl
              bg-odoo-purple
              py-3
              font-semibold
              text-white
              transition
              hover:bg-odoo-purple-dark
            "
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-odoo-muted">
          Don't have an account?{" "}
          <Link
            to="/register"
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
  type = "text",
}: {
  label: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-odoo-ink">
        {label}
      </label>

      <input
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

