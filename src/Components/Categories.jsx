import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';

function Categories({ value, onClickCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  // const count = useSelector((state) => state.counter.value);
  // const inputValue = useSelector((state) => state.sumvalue.value);
  // const dispatch = useDispatch();

  // function onClickCategory(index) {
  //   setActiveIndex(index);
  // }

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
