import { Flex, Pagination, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import searchLogo from "../../../../../assets/logos/SVG/search.svg";

type PaginationProps = {
  data: Array<Array<any>>;
  showItemsPerPageDropdown?: boolean;
  itemsPerPageData?: Array<number>;
  showPaginationWithSearch?: boolean;
  useSearchOnly?: boolean;
};

const itemsPerPageDropdownData = [10, 20, 30, 40, 50];

export const useDynamicDataSearchAndPagination = ({
  data = [],
  showItemsPerPageDropdown = true,
  itemsPerPageData = itemsPerPageDropdownData,
  showPaginationWithSearch = false,
  useSearchOnly = false,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<string>(useSearchOnly ? (data?.length ?? 10).toString() : itemsPerPageData[0].toString());

  // search states
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (useSearchOnly && data.length > 0) {
      setItemsPerPage(data.length.toString());
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredData = data?.filter(row => {
    return row.some(cell => {
      const cellValue = String(cell).toLowerCase();
      return cellValue.includes(searchQuery.toLowerCase());
    });
  });

  const finalData = filteredData?.slice((currentPage - 1) * Number(itemsPerPage), currentPage * Number(itemsPerPage));

  const maxPage = Math.ceil((searchQuery && searchQuery.length > 0 ? finalData.length : data.length || 0) / Number(itemsPerPage));

  const PaginationComponent = (
    <Flex direction={"row"} justify={"flex-end"} gap={"sm"} align={"center"}>
      <Pagination value={currentPage} onChange={setCurrentPage} total={maxPage} color='truboard-primary.0' siblings={0} />
      {showItemsPerPageDropdown && (
        <Select
          value={itemsPerPage.toString()}
          onChange={value => value && setItemsPerPage(value)}
          data={useSearchOnly ? [(data?.length ?? 10).toString()] : itemsPerPageData.map(num => num.toString())}
          size={"sm"}
          w={"100px"}
        />
      )}
      <Text size={"sm"}>Total Records : {searchQuery && searchQuery.length > 0 ? finalData?.length : data?.length}</Text>
    </Flex>
  );

  const SearchComponent = (
    <Flex align={"center"} gap={"xl"}>
      <TextInput
        placeholder='Search'
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        icon={<img src={searchLogo} className='icon-size' style={{ width: "15px", height: "15px", color: "#001d56" }} />}
      />
      {showPaginationWithSearch ? PaginationComponent : null}
    </Flex>
  );

  return { finalData, PaginationComponent, SearchComponent };
};
