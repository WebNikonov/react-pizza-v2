import React from 'react';
import {  useDispatch } from 'react-redux';
import { setSort, setOrder, selectSort, SortItem as SortType, SortItem } from '../redux/slices/filterSlice';

type SortPoputProps = {
  value: SortItem;
}

export const list:SortType[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

const SortPopup: React.FC<SortPoputProps> = React.memo(
  ({value}) => {
    const dispatch = useDispatch();
    const sortRef = React.useRef<HTMLDivElement>(null);
  
    let [open, setOpen] = React.useState(false);
  
    function onChoiseItem(obj: SortType) {
      dispatch(setSort(obj));
      setOpen(false);
    }
  
    function onChangeOrder(str: string) {
      dispatch(setOrder(str));
    }
  
  
  
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        let path = event.composedPath();
        if (sortRef.current && !path.includes(sortRef.current)) {
          setOpen(false);
        }
  
        return () => {
          document.body.removeEventListener('click', handleClickOutside);
        };
      };
  
      document.body.addEventListener('click', handleClickOutside);
    }, []);
  
    return (
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"></path>
          </svg>
          <b>Сортировка по:</b>
          <span onClick={() => setOpen((open = !open))}>{value.name} </span>
          <div className="sort__buttons">
            <button onClick={() => onChangeOrder('asc')}>&#9757;</button>
            <button onClick={() => onChangeOrder('desc')}>&#128071;</button>
          </div>
        </div>
        {open && (
          <div className="sort__popup">
            <ul>
              {list.map((obj, i) => (
                <li
                  key={i}
                  onClick={() => onChoiseItem(obj)}
                  className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                  {obj.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
)

export default SortPopup;
