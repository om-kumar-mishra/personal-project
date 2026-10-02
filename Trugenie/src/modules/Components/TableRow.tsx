import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(hdfcTheme => {
  return {
    row: {
      verticalAlign: "bottom",
      maxWidth: "100% !important",
    },
    header: {
      textAlign: "start",
      whiteSpace: "nowrap",
      fontSize: hdfcTheme.fontSizes.sm,
      border: "1px solid transparent",
      ["th"]: { backgroundColor: "#F1EFEF", color: "#001d56 !important" },
    },
    body: {
      color: "#707070",
    },
    pointer: {
      cursor: "pointer",
    },
    content: {
      border: "1px solid transparent",
      padding: "4px",
      fontSize: hdfcTheme.fontSizes.xs,
    },
    required: {
      "::after": {
        // eslint-disable-next-line quotes
        content: '" *"',
        color: "red",
        fontSize: hdfcTheme.fontSizes.sm,
      },
    },
  };
});

export function TableRow({
  title,
  value,
  withAsterisk,
  centerHeader = true,
  fullWidth = false,
  equal = false,
}: {
  title: string;
  value: JSX.Element | string | number;
  withAsterisk?: boolean;
  centerHeader?: boolean;
  fullWidth?: boolean;
  equal?: boolean;
}) {
  const { classes } = useStyles();
  return (
    <tr className={classes.row}>
      <th
        className={`${classes.header} ${withAsterisk ? classes.required : ""}`}
        style={{
          padding: "4px",
          verticalAlign: centerHeader ? "middle" : "top",
          width: equal ? "55%" : "auto",
        }}>
        {title}
      </th>
      <td style={{ width: fullWidth ? "100%" : equal ? "45%" : "auto" }} className={classes.content}>
        {value}
      </td>
    </tr>
  );
}
