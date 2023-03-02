import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sayHello } from './testSlice';

const Test = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.test);

  const handleClick = () => {
    dispatch(sayHello('Hello!'));
  };

  return (
    <div>
      <div style={{textAlign: 'center', fontSize: '20px'}}>Test Redux Toolkit Feature</div>
      <div style={{textAlign: 'center'}}>{message}</div>
      <button onClick={handleClick}>Say Hello</button>
    </div>
  );
};

export default Test;
