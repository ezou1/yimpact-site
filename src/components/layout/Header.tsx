import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

const navItems = [
  { to: '/sponsors', label: 'Partners' },
  { to: '/resources', label: 'Resources' },
  { to: '/students', label: 'Students' },
  { to: '/team', label: 'Team' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/blog', label: 'Blog' },
];

export function Header() {
  const { status } = useAuth();
  // The last item changes with the session. The markup does not.
  const items = [
    ...navItems,
    status === 'signedIn' ? { to: '/portal', label: 'Portal' } : { to: '/login', label: 'Log in' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-[calc(var(--header-h)-1px)] max-w-[1200px] items-center justify-between gap-6 px-6 md:px-10">
        <NavLink
          to="/"
          className="shrink-0 text-base font-medium tracking-[-0.035em] text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          Yale Impact <span className="accent-serif">Expo</span>
        </NavLink>
        <nav aria-label="Main" className="min-w-0">
          <ul className="flex items-center gap-x-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((item) => (
              <li key={item.to} className="shrink-0">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `label transition-colors duration-300 ease-out hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 ${
                      isActive ? 'text-ink-900' : 'text-ink-400'
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
