import {
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Backdrop,
  Box,
  Fade,
  Modal,
} from '@mui/material';
import styles from './styles';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPublicGists, clearGists, fetchForkedUsers } from './searchSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import copyText from '../../utils/copyText';
import ResultsTableData from './ResultsTable';
import { PAGE_SIZE } from '../../utils/constants';

const SearchPage = () => {
  const [userName, setUserName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, gists, isEndReached, forkedUsers } = useAppSelector(
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
    dispatch(clearGists());
  };

  const SearchBox = () => (
    <Grid
      container
      spacing={2}
      sx={styles.paddingTop20}
      justifyContent='center'
    >
      <Grid item xs={12} sx={styles.textAlignCenter}>
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
          id='search-btn'
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

  const showForkedUsers = (forksUrl: any) => {
    dispatch(fetchForkedUsers(forksUrl));
    setShowModal(true);
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
          <ResultsTableData gists={gists} showForkedUsers={showForkedUsers} />
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
              <span style={styles.colorBlue}>{userName}</span>{' '}
              {copyText.publicGists}
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <ResultsData />
      </>
    );
  };

  const handleClose = () => setShowModal(false);

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
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showModal}>
          <Box sx={styles.boxStyle}>
            {forkedUsers?.length !== 0 ? (
              <>
                <Typography
                  id='transition-modal-title'
                  variant='h6'
                  component='h2'
                  sx={styles.paddingBottom20}
                >
                  {copyText.forkedLastThreeUsers}
                </Typography>
                {forkedUsers?.slice(-3).map((user: any) => {
                  return (
                    <Container
                      disableGutters
                      sx={styles.forkedUsersContainer}
                    >
                      <img
                        src={user?.owner?.avatar_url}
                        width='50px'
                        height='50px'
                      />
                      <Typography
                        id='transition-modal-description'
                        sx={styles.forkedUserStyle}
                      >
                        {user?.owner?.login}
                      </Typography>
                    </Container>
                  );
                })}
              </>
            ) : (
              <Typography variant='h5'>{copyText.noForkedUsers}</Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default SearchPage;
