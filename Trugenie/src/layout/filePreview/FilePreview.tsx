import { useEffect, useState } from "react";

interface PropsType {
  fileData: Blob;
  fileExtension: string;
}

const FilePreview = (props: PropsType) => {
  const { fileData, fileExtension } = props;
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const reader: any = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(fileData);

    return () => URL.revokeObjectURL(previewUrl);
  }, [fileData]);

  return (
    <>
      {fileExtension === "pdf" && (
        <iframe src={previewUrl} title="PDF File" width="100%" height="520px" />
      )}
      {(fileExtension === "jpg" || fileExtension === "jpeg") && (
        <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%" }} />
      )}
    </>
  );
};

export default FilePreview;
