// @ts-nocheck
// TODO: Remove above comment to turn typescript back on
// once react-table v8 is stable for production use

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  CellProps,
  Column,
  useSortBy,
  useTable,
  useGlobalFilter,
} from "react-table";
import axios from "axios";
import { motion } from "framer-motion";
import Search from "./Search/Search";

interface RowData {
  subDomain: string;
  logoUrl: string;
  title: string;
  totalVolume: number;
  avgSale: number;
  salesCount: number;
}

const getLeaderboard = async () => {
  try {
    const response = await axios.get(
      "https://api-server-i1ckqglzc-degengigaman.vercel.app/api/holaplex/leaderboard?skipCount=0&maxResultCount=304"
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

const LeaderboardTable = () => {
  const [tableData, setTableData] = useState<RowData[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = await getLeaderboard();
      setTableData(data);
    };
    init();
  }, []);

  const columns = React.useMemo<Column<RowData>[]>(
    () => [
      {
        Header: "#",
        Cell: ({ row }: CellProps<RowData>) => {
          return (
            <div className="text-lg flex justify-center items-center">
              {row.index + 1}
            </div>
          );
        },
      },
      {
        Header: "",
        accessor: "title",
        disableSortBy: true,
        Cell: ({ row }: CellProps<RowData>) => {
          return (
            <div className="w-full flex justify-start items-center gap-5">
              <Image
                className="rounded-xl z-10"
                height={55}
                width={55}
                src={row.original.logoUrl || ""}
                alt="pfp"
              />
              <span>{row.original.title}</span>
            </div>
          );
        },
      },
      {
        Header: "◎ PRIMARY SALES",
        accessor: "totalVolume",
        Cell: ({ row }: CellProps<RowData>) => {
          return (
            <div>
              {row.original.totalVolume.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </div>
          );
        },
      },
      {
        Header: "NFTs SOLD",
        accessor: "salesCount",
        disableSortBy: true,
      },
      {
        Header: "◎ AVERAGE SALE",
        accessor: "avgSale",
        disableSortBy: true,
        Cell: ({ row }: CellProps<RowData>) => {
          return (
            <div>
              {row.original.avgSale.toLocaleString(undefined, {
                maximumFractionDigits: 1,
              })}
            </div>
          );
        },
      },
    ],
    []
  );

  const memoizedData = React.useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    { columns, data: memoizedData },
    useGlobalFilter,
    useSortBy
  );

  const openLink = (url: string): void => {
    window.open(url, "_blank");
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  return (
    <div className="flex flex-col justify-stretch items-end">
      <Search
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <div className="w-full h-full lg:h-[700px] overflow-x-hidden rounded-sm no-scrollbar border-b-2 border-b-gray-100">
        {tableData.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            {...getTableProps()}
            className="w-full font-bold rounded-sm"
          >
            <thead className="sticky top-0 opacity-100 z-50 drop-shadow-lg bg-neutral-50">
              {
                // Loop over the header rows
                headerGroups.map((headerGroup, index) => (
                  // Apply the header row props
                  <tr
                    className="h-20"
                    {...headerGroup.getHeaderGroupProps()}
                    key={`${headerGroup.id}-${index}`}
                  >
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column, columnIndex) => (
                        // Apply the header cell props
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          key={`${column.id}-${index}`}
                          className="text-center"
                        >
                          {
                            // Render the header
                            column.render("Header")
                          }
                        </th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>
            {/* Apply the table body props */}
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y-4 divide-gray-100 overflow-y-scroll"
            >
              {
                // Loop over the table rows
                rows.map((row, index) => {
                  // Prepare the row for display
                  prepareRow(row);
                  return (
                    // Apply the row props
                    <motion.tr
                      whileHover={{
                        className: "shadow-md",
                        position: "relative",
                        zIndex: 0.5,
                        scale: 1.03,
                        transition: {
                          duration: 0.2,
                        },
                      }}
                      {...row.getRowProps()}
                      key={`${row.id}-${index}`}
                      onClick={() => openLink(row.original.subDomain)}
                      className="cursor-pointer"
                    >
                      {
                        // Loop over the rows cells
                        row.cells.map((cell, index) => {
                          // Apply the cell props
                          return (
                            <td
                              {...cell.getCellProps()}
                              key={`${cell.value}-${index}`}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              {
                                // Render the cell contents
                                <div className="flex justify-center items-center">
                                  {cell.render("Cell")}
                                </div>
                              }
                            </td>
                          );
                        })
                      }
                    </motion.tr>
                  );
                })
              }
            </tbody>
          </motion.table>
        )}
      </div>
    </div>
  );
};

export default LeaderboardTable;
