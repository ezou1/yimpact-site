import { NavLink } from 'react-router-dom';
import { Wordmark } from './Wordmark';

const navItems = [
  { to: '/sponsors', label: 'Partners' },
  { to: '/students', label: 'Students' },
  { to: '/team', label: 'Team' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/blog', label: 'The Record' },
  { to: '/login', label: 'Log in' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-bar">
      <div className="mx-auto flex h-[calc(var(--header-h)-1px)] max-w-[1200px] items-center justify-between gap-6 px-6 md:px-10">
        <NavLink
          to="/"
          aria-label="Yale Impact Expo — home"
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Wordmark />
        </NavLink>
        <nav aria-label="Main" className="min-w-0">
          <ul className="flex items-center gap-x-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => (
              <li key={item.to} className="shrink-0">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `label border-b-2 pb-0.5 text-white transition-colors duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                      isActive ? 'border-white' : 'border-transparent hover:border-white/60'
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
