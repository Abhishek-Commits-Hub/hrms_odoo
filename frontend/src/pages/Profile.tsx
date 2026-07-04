import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const PROFILE_PIC = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
const BASE_URL = import.meta.env.VITE_API_URL;

type Profile = {
  id: string;
  company_name: string;
  name: string;
  email: string;
  phone: string;
  employee_id: string;
  role: string;
  status: string;
  created_at: string;
  details: {
    date_of_birth: string;
    age: number;
    joining_date: string;
    department: string;
    designation: string;
    address: string;
  } | null;
  payroll: {
    monthly_wage: string;
    yearly_wage: string;
    travel_allowance: string;
    fixed_allowance: string;
    tax_deduction: string;
  } | null;
  attendance: {
    date: string;
    status: string;
    check_in: string | null;
    check_out: string | null;
  }[];
};

function authHeaders(): Record<string, string> {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : {};
}

export default function Profile() {
  const { employee_id } = useParams();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  if (!token) return <Navigate to="/login" replace />;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const url = employee_id
        ? `${BASE_URL}/profile/${employee_id}`
        : `${BASE_URL}/profile`;
      try {
        const res = await fetch(url, { headers: authHeaders() });
        const data = await res.json();
        if (res.ok) {
          setProfile(data.profile);
        } else {
          setError(data.message || "Failed to load profile");
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [employee_id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-odoo-cream">
        <div className="text-odoo-muted">Loading profile…</div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-odoo-cream">
        <p className="text-red-600">{error || "Profile not found"}</p>
        <button onClick={() => navigate("/dashboard")} className="rounded-xl bg-odoo-purple px-5 py-2 text-sm font-semibold text-white">Back to Dashboard</button>
      </main>
    );
  }

  const attendanceTotals = profile.attendance.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const totalDays = profile.attendance.length || 1;
  const presentPercent = Math.round(((attendanceTotals["present"] || 0) / totalDays) * 100);
  const absentPercent = Math.round(((attendanceTotals["absent"] || 0) / totalDays) * 100);
  const leavePercent = Math.round(((attendanceTotals["leave"] || 0) / totalDays) * 100);
  const halfdayPercent = Math.round(((attendanceTotals["halfday"] || 0) / totalDays) * 100);

  return (
    <main className="min-h-screen bg-odoo-cream text-odoo-ink">
      <div className="pointer-events-none fixed -left-24 -top-24 h-72 w-72 rounded-full bg-odoo-teal/15 blur-3xl" />
      <div className="pointer-events-none fixed -right-16 top-40 h-80 w-80 rounded-full bg-odoo-purple/10 blur-3xl" />

      {/* Nav */}
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-odoo-purple text-sm font-bold text-white">PF</span>
          <span className="text-2xl font-semibold tracking-tight text-odoo-purple">PeopleFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(employee_id ? "/dashboard" : "/dashboard")}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-odoo-purple shadow-sm ring-1 ring-black/5 transition hover:bg-odoo-cream"
          >
            Dashboard
          </button>
        </div>
      </nav>

      {/* Profile Header */}
      <section className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-odoo-purple via-[#7a4d6b] to-[#9b5d7a] p-8 text-white shadow-xl sm:p-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <img src={PROFILE_PIC} alt="" className="h-24 w-24 rounded-2xl border-4 border-white/30 object-cover shadow-lg sm:h-28 sm:w-28" />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
              <p className="mt-1 text-lg text-white/75">{profile.details?.designation ?? profile.role}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase">{profile.role}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{profile.employee_id}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{profile.details?.department ?? "—"}</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-white/60">Status</p>
              <span className="mt-1 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold capitalize">{profile.status}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="relative mx-auto mt-8 max-w-5xl px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Info */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold text-odoo-purple">Personal Info</h2>
            <dl className="mt-4 space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-odoo-muted">Email</dt>
                <dd className="text-sm font-medium text-odoo-ink">{profile.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-odoo-muted">Phone</dt>
                <dd className="text-sm font-medium text-odoo-ink">{profile.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-odoo-muted">Date of Birth</dt>
                <dd className="text-sm font-medium text-odoo-ink">
                  {profile.details?.date_of_birth
                    ? new Date(profile.details.date_of_birth).toLocaleDateString()
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-odoo-muted">Age</dt>
                <dd className="text-sm font-medium text-odoo-ink">{profile.details?.age ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-odoo-muted">Address</dt>
                <dd className="text-sm font-medium text-odoo-ink">{profile.details?.address ?? "—"}</dd>
              </div>
            </dl>
          </div>

          {/* Job Details */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold text-odoo-purple">Job Details</h2>
            <dl className="mt-4 space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-odoo-muted">Company</dt>
                <dd className="text-sm font-medium text-odoo-ink">{profile.company_name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-odoo-muted">Department</dt>
                <dd className="text-sm font-medium text-odoo-ink">{profile.details?.department ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-odoo-muted">Designation</dt>
                <dd className="text-sm font-medium text-odoo-ink">{profile.details?.designation ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-odoo-muted">Joining Date</dt>
                <dd className="text-sm font-medium text-odoo-ink">
                  {profile.details?.joining_date
                    ? new Date(profile.details.joining_date).toLocaleDateString()
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-odoo-muted">Employee Since</dt>
                <dd className="text-sm font-medium text-odoo-ink">
                  {new Date(profile.created_at).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Payroll */}
      <section className="relative mx-auto mt-8 max-w-5xl px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <h2 className="text-lg font-semibold text-odoo-purple">Payroll</h2>
          {profile.payroll ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <PayrollCard label="Monthly Wage" value={`$${Number(profile.payroll.monthly_wage).toLocaleString()}`} />
              <PayrollCard label="Yearly Wage" value={`$${Number(profile.payroll.yearly_wage).toLocaleString()}`} />
              <PayrollCard label="Travel Allowance" value={`$${Number(profile.payroll.travel_allowance).toLocaleString()}`} />
              <PayrollCard label="Fixed Allowance" value={`$${Number(profile.payroll.fixed_allowance).toLocaleString()}`} />
              <PayrollCard label="Tax Deduction" value={`-$${Number(profile.payroll.tax_deduction).toLocaleString()}`} negative />
              <div className="rounded-xl bg-gradient-to-br from-odoo-cream to-white p-4 ring-1 ring-black/5">
                <p className="text-xs font-medium uppercase tracking-wide text-odoo-muted">Net Monthly</p>
                <p className="mt-1 text-2xl font-bold text-odoo-teal">
                  ${(Number(profile.payroll.monthly_wage) + Number(profile.payroll.travel_allowance) + Number(profile.payroll.fixed_allowance) - Number(profile.payroll.tax_deduction)).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-odoo-muted">No payroll data available.</p>
          )}
        </div>
      </section>

      {/* Attendance + Efficiency */}
      <section className="relative mx-auto mt-8 max-w-5xl px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Efficiency Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold text-odoo-purple">Attendance Efficiency</h2>
            <div className="mt-5 space-y-4">
              <Bar label="Present" count={attendanceTotals["present"] || 0} total={totalDays} color="#166534" bg="#dcfce7" />
              <Bar label="Half Day" count={attendanceTotals["halfday"] || 0} total={totalDays} color="#92400e" bg="#fef3c7" />
              <Bar label="Leave" count={attendanceTotals["leave"] || 0} total={totalDays} color="#1e40af" bg="#dbeafe" />
              <Bar label="Absent" count={attendanceTotals["absent"] || 0} total={totalDays} color="#991b1b" bg="#fee2e2" />
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-xl bg-gradient-to-r from-odoo-teal/10 to-cyan-50 p-4">
              <span className="text-3xl font-bold text-odoo-teal">{presentPercent}%</span>
              <span className="text-sm text-odoo-muted">Overall attendance rate</span>
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold text-odoo-purple">Recent Attendance</h2>
            <div className="mt-4 max-h-80 space-y-2 overflow-y-auto">
              {profile.attendance.slice(0, 15).map((record) => (
                <div
                  key={record.date}
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 transition hover:bg-odoo-cream"
                  style={{ backgroundColor: record.status === "present" ? "#f0fdf4" : record.status === "halfday" ? "#fffbeb" : record.status === "leave" ? "#eff6ff" : "#fef2f2" }}
                >
                  <span className="text-sm font-medium text-odoo-ink">
                    {new Date(record.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-2 text-xs font-semibold capitalize" style={{
                    color: record.status === "present" ? "#166534" : record.status === "halfday" ? "#92400e" : record.status === "leave" ? "#1e40af" : "#991b1b",
                  }}>
                    {record.check_in && <span>{record.check_in.slice(0, 5)}</span>}
                    {record.check_in && record.check_out && <span>→</span>}
                    {record.check_out && <span>{record.check_out.slice(0, 5)}</span>}
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mx-auto mt-14 max-w-7xl border-t border-odoo-purple/10 px-6 py-8 text-center text-sm text-odoo-muted lg:px-8">
        PeopleFlow — Human Resource Management System
      </footer>
    </main>
  );
}

function PayrollCard({ label, value, negative }: { label: string; value: string; negative?: boolean }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-odoo-cream to-white p-4 ring-1 ring-black/5">
      <p className="text-xs font-medium uppercase tracking-wide text-odoo-muted">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${negative ? "text-red-500" : "text-odoo-ink"}`}>{value}</p>
    </div>
  );
}

function Bar({ label, count, total, color, bg }: { label: string; count: number; total: number; color: string; bg: string }) {
  const pct = Math.round((count / total) * 100);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-odoo-ink">{label}</span>
        <span className="text-odoo-muted">{count} days ({pct}%)</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
