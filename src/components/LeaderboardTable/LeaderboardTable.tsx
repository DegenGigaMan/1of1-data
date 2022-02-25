import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CellProps, Column, useSortBy, useTable } from "react-table";
import axios from "axios";
import { motion } from "framer-motion";

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
      "https://api-server-i1ckqglzc-degengigaman.vercel.app/api/holaplex/leaderboard?skipCount=0&maxResultCount=104"
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
        maxWidth: 45,
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
        accessor: "logoUrl",
        maxWidth: 90,
        disableSortBy: true,
        Cell: ({ row }: CellProps<RowData>) => {
          return (
            <div className="flex justify-center items-center">
              <Image
                className="rounded-xl z-10"
                height={55}
                width={55}
                src={row.original.logoUrl || ""}
                alt="pfp"
              />
            </div>
          );
        },
      },
      {
        Header: "Collection",
        accessor: "title",
        minWidth: 200,
        disableSortBy: true,
        Cell: ({ row }: CellProps<RowData>) => {
          return (
            <a
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "1.25rem",
              }}
              target={"_blank"}
              rel="noopener noreferrer"
              href={row.original.subDomain}
            >
              {row.original.title}
            </a>
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

  const tableInstance = useTable<RowData>(
    { columns, data: memoizedData },
    useSortBy
  );

  const openLink = (url: string): void => {
    window.open(url, "_blank");
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="w-full h-[590px] overflow-y-scroll overflow-x-hidden border-2 border-gray-50">
      <table {...getTableProps()} className="w-full">
        <thead className="sticky top-0 bg-white opacity-100 z-50 border-b-2 border-b-gray-100 drop-shadow-lg">
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={`${column.id}-${index}`}
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
          className="bg-white divide-y-4 divide-gray-100"
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
      </table>
    </div>
  );
};

export default LeaderboardTable;
