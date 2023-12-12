import React, { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onChangeInput = e => {
    setQuery(e.currentTarget.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter a search term.');
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={onSubmitForm}>
        <button className={css.button} type="submit">
          Search
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChangeInput}
        />
      </form>
    </header>
  );
};






// import { Component } from 'react';
// import { toast } from 'react-toastify';
// import css from './Searchbar.module.css';

// export class Searchbar extends Component {
//    state = {
//     query: '',
//   };

//   onChangeInput = e => {
//     this.setState({ query: e.currentTarget.value });
//   };

//   onSubmitForm = e => {
//     e.preventDefault();

//     const { onSubmit } = this.props;
//     const { query } = this.state;

//     if (query.trim() === '') {
//       toast.error('Enter a search term.');
//       return;
//     }

//     onSubmit(query);
//   };

//   render() {
//     const { query } = this.state;

//     return (
//       <header className={css.header}>
//         <form className={css.form} onSubmit={this.onSubmitForm}>
//           <button className={css.button} type="submit">
//             Search
//           </button>

//           <input
//             className={css.input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={query}
//             onChange={this.onChangeInput}
//           />
//         </form>
//       </header>
//     );
//   }
// }
