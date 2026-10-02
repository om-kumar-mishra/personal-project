import { useEffect, useState } from "react";
import FilePreview from "./FilePreview";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { getFileExtrension } from "../../utils/commonFunctions";
import { IndexSignatureStringType } from "../../lib/services/Datatype";
import { API_ENDPOINT_MAIN } from "../../lib/api/commons";

interface PropsType {
  fileRequest: IndexSignatureStringType;
  setFileRequest: (params: IndexSignatureStringType) => void;
  token: string;
  visible: boolean;
  setVisible: (params: boolean) => void;
}

export const defaultFileRequest: IndexSignatureStringType = {
  fileName: "",
  containerName: "",
  filePath: "",
};

const AzureBlobComponent = (props: PropsType) => {
  const { fileRequest, setFileRequest, token, visible, setVisible } = props;
  const { containerName, filePath, fileName } = fileRequest;
  const [fileData, setFileData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (containerName && filePath && fileName && !fileData && token)
      fetchFileData();
  }, []);

  const fetchFileData = async () => {
    const url = `${API_ENDPOINT_MAIN}/summary/getSummaryDashboardDetails/files?containerName=${containerName}&filePath=${filePath}&fileName=${fileName}`;
    const headers = {
      method: "POST",
      headers: {
        // "Content-Type": "application/octet-stream",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    // const fileExtension = getFileExtrension(fileName);
    fetch(url, headers)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          if (response.status === 401 || response.status === 403) {
            // dispatch(generateTokenAction(emailid, oid));
            // setTimeout(() => window.location.reload(), [2000]);
            if (!visible) setVisible(true);
          } else if (response.status === 400) {
            alert("Bad Request");
          }
          throw new Error("Failed to download file");
        }
      })
      .then((blob: Blob) => {
        setFileData(blob);
        setIsOpen(true);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setFileRequest(defaultFileRequest);
    setFileData(null);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} scrollable fullscreen centered>
      <ModalHeader toggle={toggleModal}>Document View</ModalHeader>
      <ModalBody style={{ minHeight: "500px" }}>
        <FilePreview
          fileData={fileData}
          fileExtension={getFileExtrension(fileName)}
          // isOpen={isOpen}
          // setIsOpen={setIsOpen}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AzureBlobComponent;
