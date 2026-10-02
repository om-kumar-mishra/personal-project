import { ActionIcon, Flex, Group, ScrollArea, Table, Text, TextInput, UnstyledButton, createStyles } from "@mantine/core";
import { keys } from "@mantine/utils";
import iconEdit from "../../../assets/logos/SVG/Edit.svg"
import iconView from "../../../assets/logos/SVG/view.svg"
import iconSearch from "../../../assets/logos/SVG/search.svg"
import React, { useState } from "react";

const useStyles = createStyles(theme => ({
  th: {
    textAlign: "left",
    ["th"]: { backgroundColor: "#dedede", color: "#001d56 !important" },
  },
  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    ["th"]: { backgroundColor: "#dedede", color: "#001d56 !important" },
    color: "#001d56 !important",
  },
  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface TableColumn {
  key: string;
  name: string;
  viewIcon?: string;
  handleView?: () => void;
  editIcon?: string;
  handleEdit?: () => void;
}

interface TableData {
  columns: TableColumn[];
  data: any[];
}

interface MantineTableProps {
  tableData: TableData;
  headerText: string;
}

interface ThProps {
  children: React.ReactNode;
}

function Th({ children }: ThProps) {
  const { classes } = useStyles();
  return (
    <th className={classes.th}>
      <UnstyledButton className={classes.control}>
        <Group position='apart'>
          <Text weight={500} size='sm'>
            {children}
          </Text>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: any[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter(item => keys(item).some(key => item[key].toLowerCase().includes(query)));
}
const CustomIcon = ({ icon, onClick }: { icon: string; onClick?: () => void }) => {
  const IconComponent = icon;
  return (
    <img src={IconComponent} style={{ height: "15px", width: "15px" }} onClick={onClick} />
  )
};

export function MantineTable({ tableData, headerText }: MantineTableProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(tableData.data);
  const { classes } = useStyles();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(filterData(tableData.data, value));
  };

  const rows = sortedData.map((row, index) => (
    <tr
      // layout
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{
      //     opacity: 0,
      // }}
      // transition={{ opacity: { duration: 0.2 } }}
      key={index}>
      {tableData.columns.map(column => (
        <td key={column.key}>
          {column.name === "Action" ? (
            <Flex gap={"xs"}>
              {column.viewIcon === "true" && column.handleView && <CustomIcon icon={iconView} onClick={column.handleView} />}
              {column.editIcon === "true" && column.handleEdit && <CustomIcon icon={iconEdit} onClick={column.handleEdit} />}
            </Flex>
          ) : (
            row[column.key]
          )}
        </td>
      ))}
    </tr>
  ));

  return (
    <ScrollArea>
      <div style={{ display: "flex", alignItems: "center", paddingBottom: "5px" }}>
        <h4 style={{ marginRight: "5rem" }}>{headerText}</h4>
        <div style={{ position: "relative" }}>
          <TextInput
            radius='xl'
            size='md'
            placeholder='Search'
            rightSection={
              <ActionIcon>
                <img src={iconSearch} style={{ width: "15px", height: "15px" }} />
              </ActionIcon>
            }
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Table horizontalSpacing='md' verticalSpacing='xs' sx={{ tableLayout: "fixed", minWidth: 700 }}>
        <thead>
          <tr className={classes.control}>
            {tableData.columns.map(column => (
              <Th key={column.key}>{column.name}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            <>{rows}</>
          ) : (
            <tr>
              <td colSpan={tableData.columns.length}>
                <Text weight={500} align='center'>
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
