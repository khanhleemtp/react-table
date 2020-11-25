import React, { useMemo } from 'react'
import { useTable, useRowSelect } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import './table.css'
import { Checkbox } from './Checkbox'

const SelectingRow = () => {

    // data not re-render
    // if not use useMemo(() => abc, []) 
    // react knows new_data => re-render => caculate lot of logic
    // step 5
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    

    // step 4
    // hook

    const { 
        getTableProps, 
        getTableBodyProps,
        headerGroups, 
        rows,
        footerGroups,
        selectedFlatRows,
        prepareRow,
         } =   useTable({
            columns,
            data, 
        }, 
        useRowSelect,
        (hooks) => {
            // visibleColumns define column display in browser
            hooks.visibleColumns.push(columns => 
                 [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps() }/>
                        ),
                        Cell: ({ row}) => (
                            <Checkbox {...row.getToggleRowSelectedProps()}/>
                        )   
                    },
                    ...columns
                ]
            )
        }
        )

    const firstPageRows = rows.slice(0, 10)


    return (
        // Step 5
        <>
        <code>
                {
                JSON.stringify(
                    {
                    selectedFlatRows: selectedFlatRows.map((row) => row.original)
                    }, 
                    null,
                     2)
                }
        </code>
        <table {...getTableProps()}>
            <thead>
                {
                    // access headers return th
                    headerGroups.map(headerGroups => (
                        <tr {...headerGroups.getHeaderGroupProps()}>
                            {headerGroups.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    // access row return cell
                    firstPageRows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        )
                    })
                }
            </tbody>
            <tfoot>
                {
                footerGroups.map(footerGroup => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {
                            footerGroup.headers.map(column => (
                                <td {...column.getFooterProps()}>
                                    {
                                        column.render('Footer')
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))
                }
            </tfoot>
        </table>
        </>
    )
}

export default SelectingRow
