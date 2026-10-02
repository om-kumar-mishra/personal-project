import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(theme => {
    return {
        row: {
            verticalAlign: "bottom",
        },
        header: {
            textAlign: "start",
            whiteSpace: "nowrap",
            fontSize: theme.fontSizes.md,
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
            fontSize: theme.fontSizes.sm,
        },
        required: {
            "::after": {
                // eslint-disable-next-line quotes
                content: '" *"',
                color: "red",
                fontSize: theme.fontSizes.sm,
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
}: {
    title: string | JSX.Element;
    value: JSX.Element | string | number;
    withAsterisk?: boolean;
    centerHeader?: boolean;
    fullWidth?: boolean;
}) {
    const { classes } = useStyles();
    return (
        <tr className={classes.row}>
            <th
                className={`${classes.header} ${withAsterisk ? classes.required : ""}`}
                style={{ padding: "4px", verticalAlign: centerHeader ? "middle" : "top", color: "#001d56" }}>
                {title}
            </th>
            <td style={{ width: fullWidth ? "100%" : "auto" }} className={classes.content}>
                {value}
            </td>
        </tr>
    );
}
