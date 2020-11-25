import React, { useMemo } from 'react'
import { useTable, useGlobalFilter, useFilters } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import './table.css'
import GlobalFilter from './GlobalFilter'
import ColumnFilter from './ColumnFilter'

const FilteringTable = () => {

    // data not re-render
    // if not use useMemo(() => abc, []) 
    // react knows new_data => re-render => caculate lot of logic
    // step 5
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
    }})

    // step 4
    // hook
    const tableInstance = useTable({
        columns,
        data, 
        defaultColumn
    }, useGlobalFilter, useFilters)

    const { 
        getTableProps, 
        getTableBodyProps,
        headerGroups, 
        rows,
        footerGroups,
        prepareRow,
        state,
        setGlobalFilter,
         } = tableInstance;

    const { globalFilter } = state;



    return (
        // Step 5
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                <table {...getTableProps()}>
                    <thead>
                        {
                            // access headers return th
                            headerGroups.map(headerGroups => (
                                <tr {...headerGroups.getHeaderGroupProps()}>
                                    {headerGroups.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                            <div>
                                                {
                                                    column.canFilter ? column.render('Filter') : null
                                                }
                                            </div>
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
        </>
    )
}

export default FilteringTable
