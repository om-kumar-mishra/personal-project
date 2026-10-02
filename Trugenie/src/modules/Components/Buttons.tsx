import { Button } from "@mantine/core";

const CommonAddButton = ({
    leftIcon,
    handleClick,
    title = "Add",
    loading = false,
    offsetToBreadcrumb = false,
}: {
    leftIcon: React.ReactNode;
    handleClick: () => void;
    title: string;
    loading?: boolean;
    offsetToBreadcrumb?: boolean;
}) => {
    return (
        <Button
            sx={
                offsetToBreadcrumb
                    ? {
                        backgroundColor: "#001d56",
                        color: "white",
                        ":hover": {
                            backgroundColor: "#001d56",
                        },
                        position: "absolute",
                        right: 0,
                        top: "90px",
                    }
                    : {
                        backgroundColor: "#001d56",
                        color: "white",
                        ":hover": {
                            backgroundColor: "#001d56",
                        },
                    }
            }
            loading={loading}
            leftIcon={leftIcon}
            mr='md'
            onClick={handleClick}>
            {title}
        </Button>
    );
};

export const TBBorderedButton = ({ title, handleClick }: { title: string; handleClick?: () => void }) => {
    return (
        <Button
            variant='outline'
            sx={{
                color: "#001d56",
                borderWidth: "1px 4px 4px 1px",
                borderRadius: "10px",
                borderColor: "#001d56",
                cursor: "inherit !important",
            }}
            onClick={handleClick}>
            {title}
        </Button>
    );
};

export default CommonAddButton;
