import css from './Button.module.css';

export function Button({ onNextFetch }) {
  return (
    <button className={css.button} type="button" onClick={onNextFetch}>
      Load more
    </button>
  );
}
