import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice.js';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice.js';
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock/index';
import PizzaSkeleton from '../Components/PizzaBlock/PizzaSkeleton.jsx';
import Pagination from '../Components/Pagination/index';

import { list } from '../Components/Sort';

const Home: React.FC = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const {
    categoryId,
    sort,
    order: orderType,
    pageCount,
    searchValue,
  } = useSelector((state: any) => state.filter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = (num: number) => {
    dispatch(setPageCount(num));
  };

  const getPizzas = async () => {
    const url = 'https://64c64bf80a25021fde917f89.mockapi.io/items?';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      dispatch(
        //@ts-ignore
        fetchPizzas({
        url,
        category,
        search,
        sort,
        pageCount,
        orderType
        }));

     
    } catch (error) {
      alert('Извините, произошла ошибка...');
    } finally {
    }
    window.scrollTo(0, 0);
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
  }, [dispatch]);

  //Если был первый рендер, то запрашиваем пиццы с сервера.
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, orderType, searchValue, pageCount]);

  let pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  let skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            Не удалось получить пиццы.
            <br />
            Извините, попробуйте повторить попытку позже.
          </p>
          <a className="button button--black" href="/">
            <span>Вернуться назад</span>
          </a>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
