import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';

const data = [{
        fullName: 'Dylan Mu',
        studentid: 2010,
        programOfStudy: 'Computer Science',
        year: 'Freshman',
        gender: 'Male',
        dateTime: '2023-07-16 12:00 PM',
    },
    {
        fullName: 'Raquel Kohler',
        studentid: 201007,
        programOfStudy: 'Electrical Engineering',
        year: 'Senior',
        gender: 'Female',
        dateTime: '2023-07-16 02:30 PM',
    },
];

const Example = () => {
    const columns = useMemo(
        () => [{
                accessorKey: 'fullName',
                header: 'Full Name',
            },
            {
                accessorKey: 'studentid',
                header: 'Student-ID',
            },
            {
                accessorKey: 'programOfStudy',
                header: 'Program of Study + Year',
            },
            {
                accessorKey: 'gender',
                header: 'Gender',
            },
            {
                accessorKey: 'dateTime',
                header: 'Date and Time',
            },
        ], []
    );

    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        console.info({ rowSelection });
    }, [rowSelection]);



    return ( <
        MaterialReactTable columns = { columns }
        data = { data }
        enableRowSelection getRowId = {
            (row) => row.userId
        } //give each row a more useful id
        onRowSelectionChange = { setRowSelection } //connect internal row selection state to your own
        state = {
            { rowSelection }
        } //pass our managed row selection state to the table to use
        />
    );
};

export default Example;