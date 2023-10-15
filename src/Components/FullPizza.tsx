import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    title: string,
    imageUrl: string,
    price: string
  }>();
  const { pizzaId } = useParams();
  const navigate = useNavigate();

  console.log(pizzaId);

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios(
          'https://64c64bf80a25021fde917f89.mockapi.io/items/' + pizzaId,
        );
        setPizza(data);
        console.log(data);
      } catch (error) {
        alert('Пицца не найдена');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>'Загрузка...'</>;
  }

  return (
    <div className="container">
      <div className="pizza__wrapper">
        <h1 className="pizza__title">{pizza.title}</h1>
        <img src={pizza.imageUrl} alt={pizza.title} />

        <div className="pizza-block__price">от {pizza.price} ₽</div>
      </div>
    </div>
  );
};

export default FullPizza;
