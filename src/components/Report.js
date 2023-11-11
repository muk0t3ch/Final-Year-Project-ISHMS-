import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const columns = [
  { id: 'info', label: 'Student Name & Hospital', minWidth: 170 },
  { id: 'timeAndDate', label: 'Time & Date', minWidth: 100 },
  { id: 'prescriptionPath', label: 'Prescription', minWidth: 100 },
];

export default function ReportTable() {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function extractStudentName(info) {
    const regex = /<strong>Student Name:<\/strong>\s*([^<]+)/;
    const match = info.match(regex);
    return match ? match[1].trim() : null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:2010/get-reports');
        const data = await response.json();
        const sortedReports = data
          .map((report) => {
            const updateDate = report.updateDate || report.creationDate || new Date().toISOString();
            const currentDate = new Date(updateDate);

            const formattedDate = currentDate.toLocaleString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              timeZoneName: 'short',
            });

            return {
              ...report,
              studentName: extractStudentName(report.info),
              timeAndDate: formattedDate,
            };
          })
          .sort((a, b) => new Date(b.updateDate || b.creationDate || 0) - new Date(a.updateDate || a.creationDate || 0));

        setReports(sortedReports);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="left">
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reports
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((report) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={report._id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="left">
                      {column.id === 'prescriptionPath' ? (
                        <>
                          <IconButton
                            href={`http://localhost:2010/download-pdf?filePath=${report[column.id]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <PictureAsPdfIcon style={{ color: 'red' }} />
                            <Box ml={1}>
                            <Typography variant="body2">
                              Download Prescription
                            </Typography>
                          </Box>
                          </IconButton>
                          
                        </>
                      ) : (
                        column.id === 'info'
                          ? report.studentName
                          : column.id === 'timeAndDate'
                            ? report.timeAndDate
                            : report[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={reports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
