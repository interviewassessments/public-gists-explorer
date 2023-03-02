import React from 'react';
import {
  Typography,
  Container,
  TableContainer,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
  styled,
} from '@mui/material';
import javatag from '../../images/java-tag.png';
import jstag from '../../images/javascript-tag.png';
import texttag from '../../images/txt-tag.png';
import pythontag from '../../images/python-tag.png';
import copyText from '../../utils/copyText';
import styles from './styles';

const ResultsTableData = ({ gists }: any) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const showForkedUsers = (forksUrl: any) => {
    // implementing the forked users modal
  };

  const showFileNames = (row: any): any => {
    const fileNames = Object.keys(row.files);
    return fileNames.map((file: string) => {
      if (file.search('js') !== -1) {
        return (
          <Container
            disableGutters
            sx={styles.fileNameContainer}
          >
            <img src={jstag} width='25px' height='25px' />
            <Typography sx={styles.paddingLeft5} variant='body2'>
              {file}
            </Typography>
          </Container>
        );
      } else if (file.search('java') !== -1) {
        return (
          <Container
            disableGutters
            sx={styles.fileNameContainer}
          >
            <img src={javatag} width='25px' height='25px' />
            <Typography sx={styles.paddingLeft5} variant='body2'>{file}</Typography>
          </Container>
        );
      } else if (file.search('txt') !== -1) {
        return (
          <Container
            disableGutters
            sx={styles.fileNameContainer}
          >
            <img src={texttag} width='25px' height='25px' />
            <Typography sx={styles.paddingLeft5} variant='body2'>{file}</Typography>
          </Container>
        );
      } else if (file.search('python') !== -1) {
        return (
          <Container
            disableGutters
            sx={styles.fileNameContainer}
          >
            <img src={pythontag} width='25px' height='25px' />
            <Typography sx={styles.paddingLeft5} variant='body2'>{file}</Typography>
          </Container>
        );
      } else {
        return <Typography variant='body2'>{file}</Typography>;
      }
    });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={styles.maxHeight500}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>{copyText.publicHtmlPage}</StyledTableCell>
              <StyledTableCell align='right'>{copyText.fileNames}</StyledTableCell>
              <StyledTableCell align='right'>{copyText.usersForked}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gists.map((row: any) => (
              <StyledTableRow
                key={row.id} // There is no unique id at the moment. So, getting the duplicate key warning on the console
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component='th' scope='row'>
                  <a href={row?.html_url} target='_blank'>
                    {copyText.gistEndingWith} {row.id.substr(-4)}
                  </a>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {showFileNames(row)}
                </StyledTableCell>
                <StyledTableCell
                  align='right'
                  sx={styles.textLink}
                  onClick={() => showForkedUsers(row?.forks_url)}
                >
                  {copyText.showForkedUsers}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ResultsTableData;
