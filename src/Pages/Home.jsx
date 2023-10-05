import React from 'react';

import Categories from '../Components/Categories.jsx';
import Sort from '../Components/Sort.jsx';
import PizzaBlock from '../Components/PizzaBlock';
import PizzaSkeleton from '../Components/PizzaBlock/PizzaSkeleton.jsx';
import Pagination from '../Components/Pagination/index.jsx';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [orderType, setOrderType] = React.useState('asc');
  const [categoryId, SetCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, SetSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  /* фильрация по статичному массиву внутри pizzas
.filter((obj) => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  })*/

  let pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  let skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  React.useEffect(() => {
    setIsLoading(true);
    const url = 'https://64c64bf80a25021fde917f89.mockapi.io/items?';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `&search=${searchValue}` : '';

    fetch(
      `${url}page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=${orderType}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => SetCategoryId(id)} />
        <Sort
          value={sortType}
          onChangeSort={(id) => SetSortType(id)}
          onChangeOrder={(value) => setOrderType(value)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>

      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
