import React from 'react';
import css from './BackToTop.module.css';

export const ScrollToTop = () => {
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleUpButton = () => {
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={css.scrollup}>
      <button
        className={scroll > 300 ? '' : 'show'}
        onClick={handleUpButton}
      ></button>
    </div>
  );
};
