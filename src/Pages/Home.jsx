import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setPageCount } from '../redux/slices/filterSlice.js';
import Categories from '../Components/Categories.jsx';
import Sort from '../Components/Sort.jsx';
import PizzaBlock from '../Components/PizzaBlock';
import PizzaSkeleton from '../Components/PizzaBlock/PizzaSkeleton.jsx';
import Pagination from '../Components/Pagination/index.jsx';

import { SearchContext } from '../App.js';

const Home = () => {
  let dispatch = useDispatch();
  const { categoryId, sort, order: orderType, pageCount } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setPageCount(num));
  };

  const { searchValue } = React.useContext(SearchContext);

  let pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  let skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  React.useEffect(() => {
    setIsLoading(true);
    const url = 'https://64c64bf80a25021fde917f89.mockapi.io/items?';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `&search=${searchValue}` : '';

    axios
      .get(
        `${url}page=${pageCount}&limit=4&${category}&sortBy=${sortType}&order=${orderType}${search}`,
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });

    // fetch(
    //   `${url}page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${orderType}${search}`,
    // )
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderType, searchValue, pageCount]);

  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => onClickCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>

      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
