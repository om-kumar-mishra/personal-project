import { Flex, Pagination, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import searchLogo from "../assets/nikeIcons/37- search.svg";
import { convertDateFormatMMM } from "../utils/commonFunctions";

type searchableTypes = "text" | "date" | "number";

type PaginationProps<T extends Record<string, any>> = {
  data: Array<T>;
  columnsToSearch: Array<{
    accessorKey: keyof T;
    label?: string;
    type: searchableTypes;
  }>;
  showItemsPerPageDropdown?: boolean;
  itemsPerPageData?: Array<number>;
  showPaginationWithSearch?: boolean;
  useSearchOnly?: boolean;
};

const itemsPerPageDropdownData = [10, 20, 30, 40, 50];

const useSearchAndPagination = <T extends Record<string, any>>({
  data = [],
  columnsToSearch,
  showItemsPerPageDropdown = true,
  itemsPerPageData = itemsPerPageDropdownData,
  showPaginationWithSearch = false,
  useSearchOnly = false,
}: PaginationProps<T>) => {
  if (!data) data = [];
  showPaginationWithSearch = useSearchOnly ? false : showPaginationWithSearch;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<string>(useSearchOnly ? (data?.length ?? 10).toString() : itemsPerPageData[0].toString());
  const [errorMsg, setErrorMsg] = useState<string>("");
  //search states
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (useSearchOnly && data.length > 0) {
      setItemsPerPage(data.length.toString());
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredData = data?.filter(obj => {
    const keysToSearch = columnsToSearch.map(v => v.accessorKey);
    const dateTypeKeys = columnsToSearch.filter(v => v.type === "date").map(v => v.accessorKey);

    return keysToSearch.some(key => {
      const value = String(dateTypeKeys.includes(key) ? convertDateFormatMMM(obj[key]) : obj[key]).toLowerCase();
      return value.includes(searchQuery.toLowerCase());
    });
  });

  const handleOnChange = (e: { currentTarget: { value: string } }) => {
    if (e.currentTarget.value.trim().length > 250) {
      setErrorMsg("Invalid Input! Input can not be more than 250 characters.");
      // setSearchQuery(e.currentTarget.value);
    } else {
      setSearchQuery(e.currentTarget.value);
      setErrorMsg("");
    }
  };

  const finalData = filteredData.slice((currentPage - 1) * Number(itemsPerPage), currentPage * Number(itemsPerPage));

  const maxPage = Math.ceil((searchQuery && searchQuery.length > 0 ? finalData.length : data.length || 0) / Number(itemsPerPage));

  const PaginationComponent = (
    <Flex direction={"row"} justify={"flex-end"} gap={"sm"} align={"center"}>
      <Pagination value={currentPage} onChange={setCurrentPage} total={maxPage} color='truboard-primary.0' siblings={0} />
      {showItemsPerPageDropdown && (
        <Select
          searchable
          value={itemsPerPage.toString()}
          onChange={value => value && setItemsPerPage(value)}
          data={useSearchOnly ? [(data?.length ?? 10).toString()] : itemsPerPageData.map(num => num.toString())}
          size={"sm"}
          w={"100px"}
        />
      )}
      <Text size={"sm"}>Total Records : {searchQuery && searchQuery.length > 0 ? finalData.length : data?.length}</Text>
    </Flex>
  );

  const SearchComponent = (
    <Flex align={"center"} gap={"xl"}>
      <TextInput
        placeholder='Search'
        value={searchQuery}
        onChange={e => handleOnChange(e)}
        error={errorMsg}
        maxLength={50}
        icon={<img src={searchLogo} className='icon-size' style={{ width: "15px", height: "15px", color: "#001d56" }} />}
      />
      {showPaginationWithSearch ? PaginationComponent : null}
    </Flex>
  );

  useEffect(() => {
    if (data.length > 0 && finalData.length === 0 && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [data]);

  return { finalData, PaginationComponent, SearchComponent };
};

export default useSearchAndPagination;
