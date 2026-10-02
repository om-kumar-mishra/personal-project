import React from "react";
import "./Table.css";

interface PropsType {
  header: string[];
  height?: string;
}

const StickyHeaderAndFirstColumnTable: React.FC<PropsType> = ({
  header,
  height,
}) => {
  return (
    <div className="graph-border-lines mt-5 p-0">
      <div className="table-scroll" style={{ height: height ?? "250px" }}>
        <table className="table text-center">
          <thead>
            <tr>
              {header.map((v: string) => (
                <th scope="col">{v}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(25)].map((v, i) => (
              <tr>
                <th>row {i + 1}</th>
                {[...Array(19)].map(() => (
                  <td>Cell</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StickyHeaderAndFirstColumnTable;
