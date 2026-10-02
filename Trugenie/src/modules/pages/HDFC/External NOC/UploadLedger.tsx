import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";

const tableData = [
  {
    unit: "HDFC",
  },
  {
    unit: "ICICI",
  },
];

function UploadLedger() {
  const { finalData } = useSearchAndPagination({
    data: tableData,
    columnsToSearch: [{ accessorKey: "unit", type: "text" }],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  return (
    <>
      <NewTableWithActions
        cardHeader={<TableHeader title='Upload Ledger' />}
        columns={[
          { title: "Unit", accessorKey: "unit" },
          { title: "Actions", accessorKey: "actions", actionTypes: [{ type: "upload", onClick: () => console.log("Upload Bank Statement") }] },
        ]}
        data={finalData}
      />
    </>
  );
}

export default UploadLedger;
