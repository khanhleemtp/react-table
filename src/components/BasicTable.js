import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import './table.css'

const BasicTable = () => {

    // data not re-render
    // if not use useMemo(() => abc, []) 
    // react knows new_data => re-render => caculate lot of logic
    // step 5
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    

    // step 4
    // hook
    const tableInstance = useTable({
        columns,
        data, 
    })

    const { 
        getTableProps, 
        getTableBodyProps,
        headerGroups, 
        rows,
        footerGroups,
        prepareRow
         } = tableInstance;



    return (
        // Step 5
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
                    rows.map((row) => {
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
                <tr>
                    <td></td>
                </tr>
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
    )
}

export default BasicTable
