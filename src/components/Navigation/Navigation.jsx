import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const activeLinkClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.active);
};

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink className={activeLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={activeLinkClass} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
