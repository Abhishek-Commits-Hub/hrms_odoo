import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const PROFILE_PIC = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

const STATUS_OPTIONS = [
  { value: "present", label: "Present", color: "#166534", bg: "#dcfce7" },
  { value: "half_day", label: "Half Day", color: "#92400e", bg: "#fef3c7" },
  { value: "leave", label: "Leave", color: "#1e40af", bg: "#dbeafe" },
  { value: "absent", label: "Absent", color: "#991b1b", bg: "#fee2e2" },
] as const;

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const [statusOpen, setStatusOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<(typeof STATUS_OPTIONS)[number]>(STATUS_OPTIONS[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  async function handleLogout() {
    try {
      await fetch(`${BASE_URL}/auth/logout`, { method: "POST" });
    } catch {
      // ignore
    }
    Cookies.remove("token");
    navigate("/login");
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const employees = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    name: `Employee ${i + 1}`,
    role: ["Software Engineer", "Designer", "Product Manager"][i % 3],
    status: ["present", "absent", "leave"][i % 3] as "present" | "absent" | "leave",
  }));

  return (
    <main className="min-h-screen bg-odoo-cream text-odoo-ink">
      {/* Decorative blurs */}
      <div className="pointer-events-none fixed -left-24 -top-24 h-72 w-72 rounded-full bg-odoo-teal/15 blur-3xl" />
      <div className="pointer-events-none fixed -right-16 top-40 h-80 w-80 rounded-full bg-odoo-purple/10 blur-3xl" />

      {/* Nav */}
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-odoo-purple text-sm font-bold text-white">PF</span>
          <span className="text-2xl font-semibold tracking-tight text-odoo-purple">PeopleFlow</span>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-odoo-muted md:flex">
          <a className="transition hover:text-odoo-purple" href="#overview">Overview</a>
          <a className="transition hover:text-odoo-purple" href="#employees">Employees</a>
          <a className="transition hover:text-odoo-purple" href="#attendance">Attendance</a>
        </div>
        <div ref={dropdownRef} className="relative flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full ring-1 ring-white"
            style={{ backgroundColor: currentStatus.bg, boxShadow: `0 0 0 2px ${currentStatus.bg}` }}
          />
          <img
            src={PROFILE_PIC}
            alt="Profile"
            className="h-9 w-9 cursor-pointer rounded-full object-cover ring-2 ring-odoo-purple/20"
            onClick={() => setStatusOpen(!statusOpen)}
          />
          <button
            type="button"
            onClick={() => setStatusOpen(!statusOpen)}
            className="flex items-center text-odoo-muted transition hover:text-odoo-purple"
          >
            <svg className={`h-4 w-4 transition ${statusOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {statusOpen && (
            <div className="absolute right-0 top-12 z-50 w-44 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-odoo-muted">Set status</p>
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setCurrentStatus(option);
                    setStatusOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-odoo-ink transition hover:bg-odoo-cream"
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: option.bg }} />
                  {option.label}
                  {currentStatus.value === option.value && (
                    <svg className="ml-auto h-4 w-4 text-odoo-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              ))}
              <div className="my-1 border-t border-gray-100" />
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Header stats */}
      <section id="overview" className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Employees", value: "248", change: "+12 this month" },
            { label: "Present Today", value: "214", change: "86%" },
            { label: "On Leave", value: "18", change: "7 pending" },
            { label: "Pending Approvals", value: "9", change: "3 overdue" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-sm text-odoo-muted">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-odoo-purple">{stat.value}</p>
              <p className="mt-1 text-xs text-odoo-teal">{stat.change}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Employees section */}
      <section id="employees" className="relative mx-auto mt-10 max-w-7xl px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-odoo-purple">Employee Overview</h2>
          <button className="rounded-lg bg-gradient-to-r from-odoo-teal to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-odoo-teal/30 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-odoo-teal/25 active:scale-[0.97]">
            + New Employee
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mx-auto mt-14 max-w-7xl border-t border-odoo-purple/10 px-6 py-8 text-center text-sm text-odoo-muted lg:px-8">
        PeopleFlow — Human Resource Management System
      </footer>
    </main>
  );
}

function EmployeeCard({ employee }: { employee: { name: string; role: string; status: "present" | "absent" | "leave" } }) {
  const statusLabel = { present: "Present", absent: "Absent", leave: "Leave" }[employee.status];

  return (
    <div className="group rounded-2xl bg-gradient-to-br from-white via-[#fcf8f5] to-[#f5ebf4] p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <img src={PROFILE_PIC} alt={employee.name} className="h-14 w-14 shrink-0 rounded-xl object-cover ring-2 ring-odoo-purple/10" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-odoo-ink">{employee.name}</h3>
          <p className="truncate text-sm text-odoo-muted">{employee.role}</p>
        </div>
        <span
          className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: employee.status === "present" ? "#dcfce7" : employee.status === "absent" ? "#fef3c7" : "#dbeafe",
            color: employee.status === "present" ? "#166534" : employee.status === "absent" ? "#92400e" : "#1e40af",
          }}
        >
          {statusLabel}
        </span>
      </div>
    </div>
  );
}
