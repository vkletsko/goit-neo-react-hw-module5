import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.wrapper}>
      <p className="visually-hidden">404 Page not found</p>
    </div>
  );
}
