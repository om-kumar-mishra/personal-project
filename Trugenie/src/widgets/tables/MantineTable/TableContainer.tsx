import { MantineTable } from "./MantineTable";

export const tableData = {
    columns: [
        {
            key: "column1",
            name: "Uploaded Date",

        },
        {
            key: "column2",
            name: "MIS Date",

        },
        {
            key: "column3",
            name: "Entity",

        },
        {
            key: "column4",
            name: "Role",

        },
        {
            key: "column5",
            name: "Username",

        },
        {
            key: "column6",
            name: "Status",

        },
        {
            key: "column7",
            name: "Action",
            viewIcon: "true",
            handleView: () => console.log("View"),
            editIcon: "true",
            handleEdit: () => console.log("Download"),
        },
    ],
    data: [
        {
            column1: "20-Jan-2024 13:15:00",
            column2: "23 Nov-23",
            column3: "20-Jan-2024 13:15:00",
            column4: "23 Nov-23",
            column5: "20-Jan-2024 13:15:00",
            column6: "23 Nov-23",
            // column7: "20-Jan-2024 13:15:00",
        },
        {
            column1: "21-Jan-2024 13:15:00",
            column2: "23 Nov-23",
            column3: "Developer",
            column4: "RM",
            column5: "S47305 Shikha Jain",
            column6: "Approved",
            // column7: 1.93,
        },
    ],
};

function TableContainer() {
    return (
        <div>
            <MantineTable tableData={tableData} headerText={"MIS Table"} />
        </div>
    );
}

export default TableContainer;
