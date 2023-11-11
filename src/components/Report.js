import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'info', label: 'Student Name & Hospital', minWidth: 170 },
  { id: 'prescriptionPath', label: 'Prescription', minWidth: 100 },
];
// ... Your imports ...

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
    // Regular expression to match the student name in the info field
    const regex = /<strong>Student Name:<\/strong>\s*([^<]+)/;

    // Use the regex to find the match in the info string
    const match = info.match(regex);

    // If there is a match, return the captured group (student name)
    // Otherwise, return null
    return match ? match[1].trim() : null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:2010/get-reports');
        const data = await response.json();

        // Extract student names and update reports
        const updatedReports = data.map((report) => ({
          ...report,
          studentName: extractStudentName(report.info),
        }));

        setReports(updatedReports);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={{ width: '100%' }}>
      {/* ... TableContainer, TableHead, and other table setup ... */}
      <TableBody>
        {reports
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((report) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={report._id}>
              {columns.map((column) => (
                <TableCell key={column.id} align="left">
                  {column.id === 'prescriptionPath' ? (
                    <a href={`http://localhost:2010/download-pdf?filePath=${report[column.id]}`} target="_blank">Download Prescription</a>
                  ) : (
                    column.id === 'info' ? report.studentName : report[column.id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
      {/* ... TablePagination and other pagination setup ... */}
    </Paper>
  );
}
