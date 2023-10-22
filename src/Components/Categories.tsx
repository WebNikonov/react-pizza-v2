
import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';


const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoryProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};

const Categories: React.FC<CategoryProps>  = React.memo(({ value, onChangeCategory }) =>  {
  
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
)
export default Categories;
