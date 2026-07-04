import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main className="min-h-screen bg-odoo-cream flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-[2rem] bg-white p-10 shadow-2xl shadow-odoo-purple/10 ring-1 ring-black/5">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-semibold text-odoo-purple">
            Create Employee Account
          </h1>

          <p className="mt-3 text-odoo-muted">
            Register as an admin or HR.
          </p>
        </div>

        <form className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Input label="Company Name" />
            <Input label="Role" placeholder="HR / ADMIN" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input label="First Name" />
            <Input label="Last Name" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input label="Email" type="email" />
            <Input label="Phone Number" />
          </div>

          <Input label="Password" type="password" />

          <button
            className="
              mt-4
              rounded-xl
              bg-odoo-purple
              py-3
              font-semibold
              text-white
              transition
              hover:bg-odoo-purple-dark
            "
          >
            Register Employee
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
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-odoo-ink">
        {label}
      </label>

      <input
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

