import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/team', label: 'Team' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/login', label: 'Log in' },
];

export function Header() {
  return (
    <header className="border-b border-ink-100 bg-white">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-12">
        <NavLink
          to="/"
          className="rounded-[var(--radius-control)] text-base font-semibold text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Yale Impact Exposition
        </NavLink>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-[var(--radius-control)] text-sm font-semibold transition-colors duration-200 hover:text-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                      isActive ? 'text-blue-700' : 'text-ink-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
