import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const employees = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    name: `Employee ${i + 1}`,
    status: ["present", "absent", "leave"][i % 3],
  }));

  return (
    <main className="min-h-screen bg-odoo-cream">
      {/* Navbar */}
      <nav className="border-b border-black/10 bg-white px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-odoo-purple">
              HRMS
            </h1>

            <div className="flex gap-2">
              <button className="rounded-lg bg-odoo-purple px-4 py-2 text-sm font-medium text-white">
                Employees
              </button>

              <button className="rounded-lg px-4 py-2 text-sm text-odoo-muted hover:bg-gray-100">
                Attendance
              </button>

              <button className="rounded-lg px-4 py-2 text-sm text-odoo-muted hover:bg-gray-100">
                Time Off
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700">
              Check In
            </button>

            <div className="relative">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-odoo-purple text-xl font-bold text-white">
                R
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-4xl font-bold text-odoo-purple">
            Employees
          </h2>

          <button className="rounded-xl bg-odoo-teal px-6 py-3 font-semibold text-white hover:bg-teal-600">
            + New Employee
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function EmployeeCard({ employee }: any) {
  const statusColor = {
    present: "bg-green-500",
    absent: "bg-yellow-400",
    leave: "bg-blue-500",
  }[employee.status];

  return (
    <div className="relative rounded-3xl bg-white p-6 shadow-lg shadow-odoo-purple/5 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
      {/* Status Dot */}
      <div
        className={`absolute right-5 top-5 h-4 w-4 rounded-full ${statusColor}`}
      />

      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-odoo-cream text-3xl font-bold text-odoo-purple">
          {employee.name[0]}
        </div>

        <h3 className="mt-4 text-lg font-semibold text-odoo-ink">
          {employee.name}
        </h3>

        <p className="text-sm text-odoo-muted">
          Software Engineer
        </p>
      </div>
    </div>
  );
}


