import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      font-size: 12px !important;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table style={{tableLayout: 'auto', width: '100px'}} {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function PS3FlagsKey() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Directional Flags',
        columns: [
          {
            Header: 'Offset 7',
            accessor: 'directional-of-7',
          },
          {
            Header: 'Offset 6',
            accessor: 'directional-of-6',
          },
          {
            Header: 'Offset 5',
            accessor: 'directional-of-5',
          },
          {
            Header: 'Offset 4',
            accessor: 'directional-of-4',
          },
          {
            Header: 'Offset 3',
            accessor: 'directional-of-3',
          },
          {
            Header: 'Offset 2',
            accessor: 'directional-of-2',
          },
          {
            Header: 'Offset 1',
            accessor: 'directional-of-1',
          },
          {
            Header: 'Offset 0',
            accessor: 'directional-of-0',
          },
        ],
      },
      {
        Header: 'Named Flags',
        columns: [
          {
            Header: 'Offset 7',
            accessor: 'named-of-7',
          },
          {
            Header: 'Offset 6',
            accessor: 'named-of-6',
          },
          {
            Header: 'Offset 5',
            accessor: 'named-of-5',
          },
          {
            Header: 'Offset 4',
            accessor: 'named-of-4',
          },
          {
            Header: 'Offset 3',
            accessor: 'named-of-3',
          },
          {
            Header: 'Offset 2',
            accessor: 'named-of-2',
          },
          {
            Header: 'Offset 1',
            accessor: 'named-of-1',
          },
          {
            Header: 'Offset 0',
            accessor: 'named-of-0',
          },
        ],
      },
      {
        Header: 'Left Analog',
        columns: [
          {
            Header: 'Vertical Axis',
            accessor: 'left-vert-axis',
          },
          {
            Header: 'Horizontal Axis',
            accessor: 'left-horiz-axis',
          },
        ],
      },
      ,
      {
        Header: 'Right Analog',
        columns: [
          {
            Header: 'Vertical Axis',
            accessor: 'right-vert-axis',
          },
          {
            Header: 'Horizontal Axis',
            accessor: 'right-horiz-axis',
          },
        ],
      },
    ],
    []
  )

   const data = React.useMemo(
	   () => [
	     {
	       'directional-of-7': 'Left',
	       'directional-of-6': 'Down',
	       'directional-of-5': 'Right',
	       'directional-of-4': 'Up',
	       'directional-of-3': 'Start',
	       'directional-of-2': 'R3',
	       'directional-of-1': 'L3',
	       'directional-of-0': 'Select',
	       'named-of-7': 'Square',
	       'named-of-6': 'X',
	       'named-of-5': 'Circle',
	       'named-of-4': 'Triangle',
	       'named-of-3': 'R1',
	       'named-of-2': 'L1',
	       'named-of-1': 'R2',
	       'named-of-0': 'L2',
	       'left-vert-axis': 'Center ~135',
	       'left-horiz-axis': 'Center ~125',
	       'right-vert-axis': 'Center ~135',
	       'right-horiz-axis': 'Center ~125',
	     },
	   ],
	   []
	 )

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default PS3FlagsKey
