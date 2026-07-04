import { Link, Route, Routes } from 'react-router-dom'

import GetStarted from './pages/GetStarted'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/getstarted" element={<GetStarted />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l7 3v5c0 5-3.2 7.6-7 9-3.8-1.4-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2.2 2.2L15.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function IconClock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconCalendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9.5h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.5 13.5h.01M12 13.5h.01M15.5 13.5h.01M8.5 16.5h.01M12 16.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function IconWallet(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3.5" y="7" width="17" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 10.5h17" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14.5 14.2h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 7V6a2.5 2.5 0 012.5-2.5h5A2.5 2.5 0 0117 6v1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
function IconCheckBadge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3.5l2.1 1.3 2.4-.2 1 2.2 2.1 1.3-.6 2.4.6 2.4-2.1 1.3-1 2.2-2.4-.2L12 17.5l-2.1-1.3-2.4.2-1-2.2-2.1-1.3.6-2.4-.6-2.4 2.1-1.3 1-2.2 2.4.2L12 3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Home() {
  const modules = [
    {
      name: 'Access & Identity',
      icon: IconShield,
      copy: 'Employees sign up with an ID, email and role. Verified email and password rules keep every login accounted for.',
    },
    {
      name: 'Employee Profiles',
      icon: IconUser,
      copy: 'One record per person — job details, salary structure and documents. Employees edit contact info, Admins edit everything.',
    },
    {
      name: 'Attendance',
      icon: IconClock,
      copy: 'Daily and weekly check-in views with Present, Absent, Half-day and Leave states, visible to each employee and to HR.',
    },
    {
      name: 'Leave & Time-Off',
      icon: IconCalendar,
      copy: 'Paid, sick or unpaid leave, picked straight off a calendar. Status moves from Pending to Approved without a spreadsheet.',
    },
    {
      name: 'Payroll Visibility',
      icon: IconWallet,
      copy: 'Employees see a read-only salary structure. Admins update pay details and keep every figure reconciled.',
    },
    {
      name: 'Approvals',
      icon: IconCheckBadge,
      copy: 'HR reviews requests in one queue, adds a comment, and the decision reflects on the employee record immediately.',
    },
  ]

  const steps = [
    { step: '01', title: 'Apply', detail: 'Employee picks a leave type and date range on the calendar, adds a remark.' },
    { step: '02', title: 'Review', detail: 'Admin or HR sees it land in the approval queue alongside everyone else\u2019s.' },
    { step: '03', title: 'Resolve', detail: 'Approve or reject with a comment — the employee\u2019s record updates the same moment.' },
  ]

  return (
    <main className="min-h-screen bg-odoo-cream text-odoo-ink">
      {/* Nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-odoo-purple text-sm font-bold text-white">PF</span>
          <span className="text-2xl font-semibold tracking-tight text-odoo-purple">PeopleFlow</span>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-odoo-muted md:flex">
          <a className="transition hover:text-odoo-purple" href="#modules">Modules</a>
          <a className="transition hover:text-odoo-purple" href="#workflow">Approvals</a>
          <a className="transition hover:text-odoo-purple" href="#access">Access</a>
        </div>
        <Link
          to="/getstarted"
          className="rounded-full bg-odoo-purple px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-odoo-purple/30 transition hover:bg-odoo-purple-dark"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-odoo-teal/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-odoo-purple/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-odoo-teal shadow-sm ring-1 ring-black/5">
              <span className="h-1.5 w-1.5 rounded-full bg-odoo-teal" />
              Human Resources Suite
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-odoo-purple md:text-6xl">
              Every workday, perfectly aligned.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-odoo-muted">
              PeopleFlow digitizes onboarding, attendance, leave and payroll visibility into
              one role-based workspace — so Admins approve in a click and employees always
              know exactly where their request stands.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-lg bg-odoo-teal px-6 py-3 font-semibold text-white shadow-sm shadow-odoo-teal/30 transition hover:bg-teal-600">
                Generate credentials
              </button>
              <button className="rounded-lg bg-white px-6 py-3 font-semibold text-odoo-purple shadow-sm ring-1 ring-black/10 transition hover:bg-purple-50">
                View employees
              </button>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-odoo-purple/10 pt-6">
              <div>
                <dt className="text-2xl font-semibold text-odoo-purple">2</dt>
                <dd className="text-sm text-odoo-muted">Access tiers</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold text-odoo-purple">4</dt>
                <dd className="text-sm text-odoo-muted">Attendance states</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold text-odoo-purple">3</dt>
                <dd className="text-sm text-odoo-muted">Leave types</dd>
              </div>
            </dl>
          </div>

          {/* Dashboard mockup */}
          <div className="rounded-[2rem] bg-white p-5 shadow-2xl shadow-odoo-purple/10 ring-1 ring-black/5">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-odoo-purple to-odoo-purple-dark p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Signed in as</p>
                  <h2 className="text-2xl font-semibold">Odoo India</h2>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm">HR Admin</span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm text-white/65">Employees</p>
                  <p className="mt-2 text-3xl font-semibold">248</p>
                </div>
                <div className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm text-white/65">Pending approvals</p>
                  <p className="mt-2 text-3xl font-semibold">12</p>
                </div>
              </div>
            </div>

            <div id="modules" className="mt-5 space-y-3">
              {[
                { name: 'Priya Nair', role: 'Leave request \u2014 Paid, 2 days', status: 'Pending' },
                { name: 'Arjun Mehta', role: 'Check-in \u2014 09:04 AM', status: 'Present' },
                { name: 'Sana Iyer', role: 'Leave request \u2014 Sick, 1 day', status: 'Approved' },
              ].map((row) => (
                <article key={row.name} className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div>
                    <h3 className="font-semibold text-odoo-ink">{row.name}</h3>
                    <p className="text-sm text-odoo-muted">{row.role}</p>
                  </div>
                  <span
                    className={
                      'rounded-full px-3 py-1 text-xs font-semibold ' +
                      (row.status === 'Pending'
                        ? 'bg-amber-100 text-amber-700'
                        : row.status === 'Approved'
                        ? 'bg-odoo-teal/15 text-odoo-teal'
                        : 'bg-odoo-cream text-odoo-purple')
                    }
                  >
                    {row.status}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <section className="mx-auto max-w-7xl px-6 pb-6 pt-4 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-odoo-teal">Everything in one workspace</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-odoo-purple md:text-4xl">
            Built for both sides of the org chart.
          </h2>
          <p className="mt-4 text-odoo-muted">
            Admins and HR officers manage, approve and pay. Employees view their own profile,
            attendance and leave. Same workspace, different keys.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(({ name, icon: Icon, copy }) => (
            <div
              key={name}
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-odoo-cream text-odoo-purple transition group-hover:bg-odoo-purple group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-odoo-ink">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-odoo-muted">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Approval workflow */}
      <section id="workflow" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-odoo-teal">How a request moves</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-odoo-purple">
              From calendar tap to closed record.
            </h2>
            <p className="mt-4 text-odoo-muted">
              Every leave request follows the same path, so nobody has to ask &ldquo;where is
              this stuck?&rdquo;
            </p>
          </div>
          <ol className="grid gap-6 sm:grid-cols-3">
            {steps.map(({ step, title, detail }) => (
              <li key={step} className="relative rounded-2xl bg-odoo-cream p-5">
                <span className="text-sm font-semibold text-odoo-teal">{step}</span>
                <h3 className="mt-2 font-semibold text-odoo-purple">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-odoo-muted">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Access / roles */}
      <section id="access" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-odoo-purple p-8 text-white">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Admin / HR Officer</span>
            <h3 className="mt-4 text-2xl font-semibold">Manage, approve, pay.</h3>
            <p className="mt-3 text-white/75">
              Full employee directory, attendance across the org, leave approvals with
              comments, and control over every salary structure.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <span className="rounded-full bg-odoo-cream px-3 py-1 text-xs font-semibold text-odoo-purple">Employee</span>
            <h3 className="mt-4 text-2xl font-semibold text-odoo-ink">View, apply, track.</h3>
            <p className="mt-3 text-odoo-muted">
              Personal profile, job details and a read-only salary view, plus check-in and
              leave applications with live status.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl bg-odoo-teal/10 p-8 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-xl font-semibold text-odoo-purple">Ready to bring HR into one place?</h3>
            <p className="mt-1 text-odoo-muted">Set up roles, invite your team, and let approvals run themselves.</p>
          </div>
          <Link
            to="/getstarted"
            className="whitespace-nowrap rounded-full bg-odoo-purple px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-odoo-purple/30 transition hover:bg-odoo-purple-dark"
          >
            Get Started
          </Link>
        </div>
      </section>

      <footer className="border-t border-odoo-purple/10 py-8 text-center text-sm text-odoo-muted">
        PeopleFlow — Human Resource Management System
      </footer>
    </main>
  )
}

export default App
