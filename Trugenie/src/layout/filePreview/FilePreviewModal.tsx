import { Modal, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";

interface PropsType {
  fileData: Blob | null;
  fileExtension: string | null;
  open: boolean;
  onClose: () => void;
}

export const supportFileExtension = ["pdf", "jpg", "jpeg"];

const useStyles = createStyles(() => ({
  modal: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}));

const FilePreviewModal = (props: PropsType) => {
  const { classes } = useStyles();
  const { fileData, fileExtension, open, onClose } = props;
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    // const reader: any = new FileReader();
    // reader.onloadend = () => {
    //   setPreviewUrl(reader.result);
    // };
    // reader.readAsDataURL(fileData);
    if (!fileData) return;
    const blob = new Blob([fileData], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(previewUrl);
  }, [fileData]);

  return (
    <>
      <Modal size={"80%"} opened={open} onClose={onClose} classNames={{ body: classes.modal }}>
        {fileExtension === "pdf" && <iframe src={previewUrl} title='PDF File' width='100%' height='520px' />}
        {(fileExtension === "jpg" || fileExtension === "jpeg") && <img src={previewUrl} alt='Preview' style={{ maxWidth: "100%" }} />}
      </Modal>
    </>
  );
};

export default FilePreviewModal;
