import { Card, Center, Flex, Loader, ScrollArea, Space, Table, Text, Title, createStyles } from "@mantine/core";
import assignUserIcon from "../../../assets/logos/SVG/Assign_User.svg";
import RemoveIcon from "../../../assets/logos/SVG/Delete.svg";
import EditIcon from "../../../assets/logos/SVG/Edit.svg";
import crossIcon from "../../../assets/logos/SVG/cross.svg";
import decision from "../../../assets/logos/SVG/decision.svg";
import enableDisableIcon from "../../../assets/logos/SVG/enable_disable.svg";
import remarkIcon from "../../../assets/logos/SVG/remarks.svg";
import removeAccessIcon from "../../../assets/logos/SVG/remove_access.svg";
import checkIcon from "../../../assets/logos/SVG/round_check.svg";
import wrongIcon from "../../../assets/logos/SVG/round_cross.svg";
import timelineIcon from "../../../assets/logos/SVG/timeline.svg";
import viewDocumentIcon from "../../../assets/logos/SVG/view.document.svg";
import viewIcon from "../../../assets/logos/SVG/view.svg";
import withDraw from "../../../assets/logos/SVG/withdraw.svg";
import DownloadIcon from "../../../assets/logos/download.svg";
import uploadIcon from "../../../assets/logos/upload.svg";
import { CustomIcon, getPresentableValue } from "../../../modules/Components/UtilityFunctions";
import AddIcon from "../../../assets/logos/SVG/add-user.svg";
//All the icons supported in action column, if you want to add more icons, add here
const actionIconMap = {
  edit: { icon: EditIcon, tooltip: "Edit" },
  view: { icon: viewIcon, tooltip: "View" },
  delete: { icon: RemoveIcon, tooltip: "Delete" },
  download: {
    icon: DownloadIcon,
    tooltip: "Download",
  },
  approve: { icon: checkIcon, tooltip: "Approve" },
  reject: { icon: wrongIcon, tooltip: "Reject" },
  decision: { icon: decision, tooltip: "Decision" },
  document: { icon: viewDocumentIcon, tooltip: "Document" },
  timeline: { icon: timelineIcon, tooltip: "Timeline" },
  remarks: { icon: remarkIcon, tooltip: "Remarks" },
  deactivate: { icon: crossIcon, tooltip: "Deactivate" },
  assignUser: { icon: assignUserIcon, tooltip: "AssignUser" },
  enableDisableUser: { icon: enableDisableIcon, tooltip: "Enable/Disable" },
  removeUser: { icon: removeAccessIcon, tooltip: "Remove User" },
  upload: { icon: uploadIcon, tooltip: "Upload" },
  withDraw: { icon: withDraw, tooltip: "WithDraw" },
  trashFilled: { icon: RemoveIcon, tooltip: "Delete" },
  Add: { icon: AddIcon, tooltip: "Add" },
};

export const TableHeader = ({
  title,
  SearchComponent,
  PaginationComponent,
  afterHeader,
  afterSearch,
}: {
  title?: string | JSX.Element;
  SearchComponent?: JSX.Element;
  PaginationComponent?: JSX.Element;
  afterHeader?: JSX.Element;
  afterSearch?: JSX.Element;
}) => {
  return (
    <>
      <Flex align={"center"} justify={"space-between"}>
        <Flex justify={"flex-start"} mb={"sm"} gap={"md"} align={"center"}>
          <Flex gap={10} align={"center"}>
            <Title order={4} color='#001d56'>
              {title}
            </Title>
            {SearchComponent}
            {afterSearch}
          </Flex>
        </Flex>
      </Flex>
      {PaginationComponent}
      <Space h={"sm"} />
      {afterHeader}
    </>
  );
};

export const useStyles = createStyles(theme => {
  return {
    header: {
      ["th"]: {
        backgroundColor: "#dedede",
        color: "#001d56 !important",
        fontSize: "12px !important",
      },
      height: "2.5rem",
    },
    body: {
      fontSize: "0.8rem !important",
      color: "gray !important",
      fontWeight: 500,
      // lineBreak: "anywhere",
    },
    stickyHeader: {
      position: "sticky",
      top: 0,
      zIndex: 49,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      ["th"]: { backgroundColor: "#dedede", color: "#001d56 !important" },
      transition: "box-shadow 150ms ease",
    },
    selectedRow: {
      backgroundColor: "#001d56",
      ["td"]: { color: "#fff !important" },
    },
  };
});

export type ActionType = keyof typeof actionIconMap;

interface ColumnWithActions<T> {
  title: string;
  accessorKey: "actions";
  transform?: (value: any, row: T) => string | JSX.Element;
  onClick?: (row: T) => void | null;
  icon?: (row: T) => string | JSX.Element;
  actionTypes?: {
    type: ActionType;
    disabled?: (row: T) => boolean;
    onClick?: (row: T) => void;
    loading?: (row: T) => boolean;
    override?: (row: T) => { icon?: string | null; tooltip?: string | null; color?: string };
  }[];
  type?: "string" | "number" | "date";
}

//If accessorKey is not "actions", then it will not accept actionTypes
interface ColumnWithoutActions<T> {
  title: string;
  accessorKey: keyof T;
  transform?: (value: any, row: T) => string | JSX.Element;
  onClick?: (row: T) => void;
  icon?: (row: T) => string | JSX.Element;
  type?: "string" | "number" | "date";
}

type TableColumn<T> = ColumnWithActions<T> | ColumnWithoutActions<T>;

interface TableWithActionProps<T> {
  columns: TableColumn<T>[];
  cardHeader?: JSX.Element;
  data: T[];
  stickyHeader?: boolean;
  loader?: boolean;
  rowClick?: (row: T) => void | null;
  selectedRow?: T;
  setSelectedRow?: (row: T) => void;
  rowDisable?: (row: T) => boolean;
  noMargin?: boolean;
}

const hasActionTypes = <T extends Record<string, any>>(column: TableColumn<T>): column is ColumnWithActions<T> => {
  return (column as ColumnWithActions<T>).actionTypes !== undefined;
};

const TableWithAction = <T extends Record<string, any>>(props: TableWithActionProps<T>) => {
  const { columns, cardHeader, data, stickyHeader, rowClick, loader, selectedRow, setSelectedRow, rowDisable, noMargin } = props;
  const { classes } = useStyles();

  return (
    <Card
      shadow='sm'
      radius='md'
      padding='md'
      m={noMargin ? 0 : "md"}
      withBorder
      style={{
        overflow: "visible",
      }}>
      {cardHeader}
      <ScrollArea>
        <Table fontSize={"xs"}>
          <thead className={stickyHeader ? classes.stickyHeader : classes.header}>
            <tr>
              {columns?.map((header, index) => (
                <th key={index} className={classes.header} style={{ textAlign: "left" }}>
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={classes.body}>
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={{ cursor: `${setSelectedRow ? "pointer" : "auto"}` }}
                  className={selectedRow && JSON.stringify(selectedRow) === JSON.stringify(row) ? classes.selectedRow : ""}
                  onClick={
                    setSelectedRow
                      ? () => {
                          setSelectedRow(row);
                        }
                      : undefined
                  }>
                  {columns.map((column, cellIndex) => {
                    //All the action buttons will be rendered here in if condition
                    if (column.accessorKey === "actions" && hasActionTypes(column)) {
                      return (
                        <td key={cellIndex} width={"10%"}>
                          <Flex justify={"flex-middle"} gap={"xs"}>
                            {column.actionTypes &&
                              column.actionTypes.map((actionType, index) => {
                                const { type, onClick, override, loading } = actionType;
                                let SelectedIcon: any | undefined = actionIconMap[type].icon;
                                let customTooltip = actionIconMap[type].tooltip;
                                const disabled = actionType.disabled ? actionType.disabled(row) : false;
                                let iconColor = "";
                                if (override) {
                                  const { icon, tooltip, color } = override(row);
                                  SelectedIcon = icon ? icon : icon === null ? undefined : SelectedIcon;
                                  customTooltip = tooltip ?? customTooltip;
                                  iconColor = color ?? "";
                                }
                                if (loading) {
                                  const isLoading = loading(row);
                                  if (isLoading) {
                                    return <Loader key={index} size='xs' />;
                                  } else {
                                    return (
                                      <CustomIcon
                                        disabled={disabled}
                                        key={index}
                                        icon={SelectedIcon}
                                        onClick={!disabled ? () => onClick && onClick(row) : undefined}
                                        tooltipText={customTooltip}
                                        color={iconColor}
                                        rowDisable={rowDisable && rowDisable(row) ? true : false}
                                      />
                                    );
                                  }
                                } else {
                                  return (
                                    <CustomIcon
                                      disabled={disabled}
                                      key={index}
                                      icon={SelectedIcon}
                                      onClick={!disabled ? () => onClick && onClick(row) : undefined}
                                      tooltipText={customTooltip}
                                      color={iconColor}
                                      rowDisable={rowDisable && rowDisable(row) ? true : false}
                                    />
                                  );
                                }
                              })}
                          </Flex>
                        </td>
                      );
                    }
                    return (
                      <td
                        key={`row-${rowIndex}-cell-${cellIndex}`}
                        className={classes.body}
                        // style={{
                        //   wordBreak: "break-word",
                        // }}
                        {...(rowClick && {
                          onClick: () => rowClick(row),
                          style: { cursor: "pointer" },
                        })}
                        title={getPresentableValue(row?.[column.accessorKey], column?.type === "date").toString()}>
                        <Text
                          lineClamp={2}
                          className={rowDisable && rowDisable(row) ? "opacity-50" : ""}
                          {...(column?.onClick && {
                            onClick: () => (column.onClick ? column.onClick(row) : undefined),
                            style: { cursor: "pointer" },
                            color: `${column.icon ? "" : "blue"}`,
                          })}>
                          {column.transform ? column.transform(row?.[column.accessorKey], row) : getPresentableValue(row?.[column.accessorKey])}
                          {column?.icon ? column.icon(row) : ""}
                        </Text>
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length ?? 2}
                  style={{
                    backgroundColor: "white",
                  }}>
                  <Center mx='auto'>{loader ? <Loader size='md' /> : "No data Found!"}</Center>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
};

export default TableWithAction;
