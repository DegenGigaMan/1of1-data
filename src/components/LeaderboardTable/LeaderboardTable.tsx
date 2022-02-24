import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CellProps, Column, Row, useTable } from "react-table";
import axios from "axios";

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
          return <div style={{ fontSize: "1.25rem" }}>{row.index + 1}</div>;
        },
      },
      {
        Header: "",
        accessor: "logoUrl",
        maxWidth: 90,
        sortable: false,
        Cell: ({ row }: CellProps<RowData>) => {
          debugger;
          return (
            <div>
              <a href={row.original.subDomain}>
                <Image
                  className="pfp"
                  height={55}
                  width={55}
                  src={row.original.logoUrl || ""}
                  alt="pfp"
                />
              </a>
            </div>
          );
        },
      },
      {
        Header: "",
        accessor: "title",
        minWidth: 200,
        sortable: false,
        Cell: ({ row }: CellProps<RowData>) => {
          debugger;
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
        desc: false,
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
        sortable: false,
      },
      {
        Header: "◎ AVERAGE SALE",
        accessor: "avgSale",
        sortable: false,
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

  const tableInstance = useTable<RowData>({ columns, data: tableData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="w-full h-full overflow-y-scroll">
      <table className="w-full" {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup, index) => (
              // Apply the header row props
              <tr
                className="border-2 border-black divide-x-2"
                {...headerGroup.getHeaderGroupProps()}
              >
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()} key="headerGroup">
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
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr
                  className="border-2 border-black divide-x-2"
                  {...row.getRowProps()}
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
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
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
