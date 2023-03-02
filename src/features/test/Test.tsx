import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sayHello } from './testSlice';

const Test = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.test);

  const handleClick = () => {
    dispatch(sayHello('Hello!'));
  };

  return (
    <Container disableGutters>
      <Typography sx={{textAlign: 'center'}} variant='h2'>Test Redux Toolkit Feature</Typography>
      <Typography sx={{textAlign: 'center'}} variant='body1'>{message}</Typography>
      <Button variant='contained' onClick={handleClick}>Say Hello</Button>
    </Container>
  );
};

export default Test;
