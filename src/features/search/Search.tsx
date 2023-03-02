import {
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import styles from './styles';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPublicGists, clearGists } from './searchSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import copyText from '../../utils/copyText';
import ResultsTableData from './ResultsTable';
import { PAGE_SIZE } from '../../utils/constants';

const SearchPage = () => {
  const [userName, setUserName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useAppDispatch();
  const { loading, gists, isEndReached } = useAppSelector(
    (state) => state.search
  );

  useEffect(() => {
    if (gists?.length >= 30) {
      dispatch(fetchPublicGists({ userName, pageNumber }));
    }
  }, [pageNumber]);

  const getPublicGists = () => {
    setPageNumber(1);
    dispatch(clearGists());
    dispatch(fetchPublicGists({ userName, pageNumber: 1 }));
  };

  const getNextPageGists = () => {
    setPageNumber(pageNumber + 1);
  };

  const LoadMore = () => {
    if (gists.length >= PAGE_SIZE && isEndReached === false) {
      return (
        <LoadingButton
          variant='text'
          loading={loading}
          onClick={getNextPageGists}
          disabled={isEndReached}
        >
          {copyText.loadNext} {PAGE_SIZE}
        </LoadingButton>
      );
    }
    return <></>;
  };

  const NoUsersFound = () => (
    <Container sx={styles.loadingIndicatorStyles}>
      <Typography variant='h5'>{copyText.noUsersFoundYet}</Typography>
    </Container>
  );

  const onChangeValue = (event: any) => {
    setUserName(event.target.value);
  };

  const SearchBox = () => (
    <Grid
      container
      spacing={2}
      sx={styles.paddingTop20}
      justifyContent='center'
    >
      <Grid item xs={12} sx={{textAlign: 'center'}}>
        <Typography variant='h4'>{copyText.welcome}</Typography>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          required
          id='search-username'
          label={copyText.enterUserName}
          onChange={onChangeValue}
          defaultValue={userName}
          autoFocus
        />
      </Grid>
      <Grid item xs={1}>
        <Button
          variant='contained'
          sx={styles.heigh100Per}
          onClick={getPublicGists}
        >
          {copyText.search}
        </Button>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );

  const LoadingIndicator = () => (
    <Container sx={styles.loadingIndicatorStyles}>
      <CircularProgress color='inherit' />
    </Container>
  );

  const getAvatar = () => {
    const userObj: any = gists[0];
    return userObj?.owner?.avatar_url || '';
  };

  const ResultsData = () => {
    return (
      <Grid
        container
        spacing={2}
        sx={styles.resultDataContainer}
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <ResultsTableData gists={gists} />
        </Grid>
        <Grid item xs={2}></Grid>
        <LoadMore />
      </Grid>
    );
  };

  const ResultsInfo = () => {
    const avatar = getAvatar();
    return (
      <>
        <Grid
          container
          spacing={2}
          sx={styles.paddingTop20}
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={1} sx={styles.textAlignRight}>
            <img src={avatar} width='50px' height='50px' />
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h5'>
              <span style={{color: 'blue'}}>{userName}</span> {copyText.publicGists}
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <ResultsData />
      </>
    );
  };

  return (
    <React.Fragment>
      <SearchBox />
      {loading && gists.length === 0 ? (
        <LoadingIndicator />
      ) : gists.length !== 0 ? (
        <ResultsInfo />
      ) : (
        <NoUsersFound />
      )}
    </React.Fragment>
  );
};

export default SearchPage;
