import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import { Currency } from "../../../Components/UtilityFunctions";

const tableData = [
    {
        bankname: "HDFC",
        date: "02-02-2022",
        amount: "12,00,000",
        referenceno: "21548784",
        chequeno: "ICIC000"
    },
]

function CreditDetails() {

    const { finalData, SearchComponent, PaginationComponent } =
        useSearchAndPagination({
            data: tableData,
            columnsToSearch: [
                { accessorKey: "bankname", type: "text" },
                { accessorKey: "date", type: "text" },
                { accessorKey: "amount", type: "text" },
                { accessorKey: "referenceno", type: "text" },
                { accessorKey: "chequeno", type: "text" },
            ],
            itemsPerPageData: [10, 20, 30, 40, 50],
            showItemsPerPageDropdown: true,
            showPaginationWithSearch: false,
        });

    return (
        <>
            <NewTableWithActions
                cardHeader={
                    <TableHeader
                        title="Credit details"
                    // SearchComponent={SearchComponent}
                    // PaginationComponent={PaginationComponent}
                    />
                }
                columns={[
                    { title: "Bank Name", accessorKey: "bankname" },
                    { title: "Date", accessorKey: "date" },
                    { title: "Amount", accessorKey: "amount", transform: (amount: string) => <Currency value={amount} currencyCode='INR' /> },
                    { title: "Reference No.", accessorKey: "referenceno" },
                    { title: "Cheque No.", accessorKey: "chequeno" },
                ]}
                data={finalData}
            />
        </>
    )
}

export default CreditDetails;