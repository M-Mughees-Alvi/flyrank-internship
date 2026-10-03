import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/exercises", label: "Exercises" },
  { to: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <span className="navbar__brand">FitPlanner</span>
        <nav className="navbar__links">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
