import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice.js';
import Categories from '../Components/Categories.jsx';
import Sort from '../Components/Sort.jsx';
import PizzaBlock from '../Components/PizzaBlock';
import PizzaSkeleton from '../Components/PizzaBlock/PizzaSkeleton.jsx';
import Pagination from '../Components/Pagination/index.jsx';

import { list } from '../Components/Sort.jsx';

import { SearchContext } from '../App.js';

const Home = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, order: orderType, pageCount } = useSelector((state) => state.filter);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setPageCount(num));
  };

  const { searchValue } = React.useContext(SearchContext);

  let pizzas = items.map((obj, index) => <PizzaBlock key={index} {...obj} />);
  let skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  const fetchPizzas = () => {
    setIsLoading(true);
    const url = 'https://64c64bf80a25021fde917f89.mockapi.io/items?';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `&search=${searchValue}` : '';

    axios
      .get(
        `${url}page=${pageCount}&limit=4&${category}&sortBy=${sort.sortProperty}&order=${orderType}${search}`,
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
  };

  //Если был первый рендер и параметры изменились
  React.useEffect(() => {
    if (isMounted.current) {
      let querySting = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        pageCount,
      });

      navigate(`?${querySting}`);
    }

    isMounted.current = true;
  }, [categoryId, pageCount, sort.sortProperty, navigate]);

  //Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      let sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то запрашиваем пиццы с сервера.
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, orderType, searchValue, pageCount]);

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
