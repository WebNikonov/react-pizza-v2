import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch();
  let [value, setValue] = React.useState('');
  const { searchValue } = useSelector((state) => state.filter.searchValue);

  const inputRef = React.useRef();

  let updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 300),
    [],
  );

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg className={styles.search} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs></defs>
        <title />
        <g data-name="Layer 2" id="Layer_2">
          <path d="M13,23A10,10,0,1,1,23,13,10,10,0,0,1,13,23ZM13,5a8,8,0,1,0,8,8A8,8,0,0,0,13,5Z" />
          <path d="M28,29a1,1,0,0,1-.71-.29l-8-8a1,1,0,0,1,1.42-1.42l8,8a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск..."
      />
      {searchValue && (
        <svg
          onClick={() => onClickClear()}
          className={styles.close}
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;
