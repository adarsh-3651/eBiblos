import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const data = useSelector((state) => state.example.data); // Accessing the example reducer's data

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
