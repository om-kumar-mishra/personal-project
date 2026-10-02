/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import withModal from "../../hoc/withModal";
import SearchComponent from "../../modules/Components/SearchComponent";
import SimpleTableWithPagination from "./SimpleTableWithPagination";

interface ViewHistoryTableProps {
    tableData: {
        detailedHistoryCol: any[];
        detailedHistoryData: any[];
        clauseHistoryCol: any[];
        clauseHistoryData: any[];
    };
    height: string;
    viewHistoryRow: any;
    viewLogsCheckKey: string;
    setViewHistoryRow: React.Dispatch<React.SetStateAction<any>>;
    viewClauseHistoryRow: any;
}

const ViewHistoryTable: React.FC<ViewHistoryTableProps> = ({
    tableData,
    height,
    viewHistoryRow,
    viewLogsCheckKey,
    setViewHistoryRow,
    viewClauseHistoryRow,
}) => {
    const {
        detailedHistoryCol,
        detailedHistoryData,
        clauseHistoryCol,
        clauseHistoryData,
    } = tableData;
    const [filterData, setFilterData] = useState(clauseHistoryData);

    return (
        <div className="main-body" style={{ minHeight: "480px" }}>
            {viewClauseHistoryRow && (
                <div className="mb-2">
                    <div className="row">
                        <b className="col-md-2 col-sm-4">Contract: </b>
                        <span className="col-md-10 col-sm-8">
                            {viewClauseHistoryRow?.contractName}
                        </span>
                    </div>
                    <div className="row">
                        <b className="col-md-2 col-sm-4">Clause Number: </b>
                        <span className="col-md-10 col-sm-8">
                            {viewClauseHistoryRow?.clauseNumber}
                        </span>
                    </div>
                    <div className="row">
                        <b className="col-md-2 col-sm-4">Clause Text: </b>
                        <span className="col-md-10 col-sm-8">
                            {viewClauseHistoryRow?.clauseText}
                        </span>
                    </div>
                </div>
            )}
            <SearchComponent data={clauseHistoryData} setFilterData={setFilterData} columns={[]} />
            <SimpleTableWithPagination
                tableData={{
                    id: "clauseHistoryTable",
                    columns: clauseHistoryCol,
                    data: filterData,
                }}
                height={height}
                setViewHistoryRow={setViewHistoryRow}
                viewHistoryRowId={viewHistoryRow?.[viewLogsCheckKey]}
                viewHistoryCheckKey={viewLogsCheckKey}
            />
            {viewHistoryRow && (
                <>
                    <h6 className="main-color mt-0">Detailed History</h6>
                    <SimpleTableWithPagination
                        tableData={{
                            id: "detailedHistoryTable",
                            columns: detailedHistoryCol,
                            data: detailedHistoryData,
                        }}
                        height={height}
                    />
                </>
            )}
        </div>
    );
};

const ViewHistoryTableWithModal = withModal(ViewHistoryTable);

interface TableWithSearchProps {
    tableData: {
        id: string;
        columns: any[];
        data: any[];
        detailedHistoryData: any[];
        clauseHistoryData: any[];
    };
    height: string;
    viewClauseHistoryRow: any;
    setViewClauseHistoryRow: React.Dispatch<React.SetStateAction<any>>;
    viewLogsRow: any;
    setViewLogsRow: React.Dispatch<React.SetStateAction<any>>;
    viewLogsCheckKey: string;
    viewHistoryCheckKey: string;
}

const TableWithSearch: React.FC<TableWithSearchProps> = ({
    tableData,
    height,
    viewClauseHistoryRow,
    setViewClauseHistoryRow,
    viewLogsRow,
    setViewLogsRow,
    viewLogsCheckKey,
    viewHistoryCheckKey,
}) => {
    const { id, columns, data, detailedHistoryData, clauseHistoryData } =
        tableData;
    const [filterData, setFilterData] = useState(data);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    useEffect(() => {
        if (
            !isHistoryModalOpen &&
            viewClauseHistoryRow &&
            clauseHistoryData &&
            detailedHistoryData
        ) {
            setIsHistoryModalOpen(true);
        }
    }, [clauseHistoryData, detailedHistoryData]);

    useEffect(() => {
        if (!isHistoryModalOpen) {
            setViewClauseHistoryRow(undefined);
            setViewLogsRow(undefined);
        }
    }, [isHistoryModalOpen]);

    return (
        <div className="main-body" style={{ minHeight: "480px" }}>
            <SearchComponent
                data={data}
                columns={columns}
                setFilterData={setFilterData}
            />
            <SimpleTableWithPagination
                tableData={{ id, columns, data: filterData }}
                setViewHistoryRow={setViewClauseHistoryRow}
                height={height}
                viewHistoryRowId={viewClauseHistoryRow?.[viewHistoryCheckKey]}
                viewHistoryCheckKey={viewHistoryCheckKey}
            />
            <ViewHistoryTableWithModal
                tableData={tableData}
                height={height}
                isOpen={isHistoryModalOpen}
                setIsOpen={setIsHistoryModalOpen}
                title="Detailed History"
                viewHistoryRow={viewLogsRow}
                setViewHistoryRow={setViewLogsRow}
                size="xl"
                viewLogsCheckKey={viewLogsCheckKey}
                viewClauseHistoryRow={viewClauseHistoryRow}
                CloseButn={false}
            />
        </div>
    );
};
const TableWithModalandSearch = withModal(TableWithSearch);
export default TableWithModalandSearch;
