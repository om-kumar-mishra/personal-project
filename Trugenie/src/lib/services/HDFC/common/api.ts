import { errorNotification } from "../../../../utils/notifications";
import { HDFC_API_ENDPOINT, getFileBlob, getParams } from "../../../api/commons";
import FileSaver from "file-saver";

export const downloadRowDataAPI = async (token: string, containerName: string, filePath: string, fileName: string) => {
  const params = {
    containerName,
    filePath,
    fileName,
  };
  const url = `${HDFC_API_ENDPOINT}/fileManager/downloadFile${getParams(params)}`;
  try {
    const { fileName, data } = await getFileBlob(url, token);
    FileSaver.saveAs(data, fileName);
    return data;
  } catch (error: unknown) {
    console.log(`Error while downloading data: ${error}`);
    return null;
  }
};

export const viewFileDocuementAPI = async (token: string, containerName: string, filePath: string, fileName: string) => {
  const params = {
    containerName,
    filePath,
    fileName,
  };
  const url = `${HDFC_API_ENDPOINT}/fileManager/downloadFile${getParams(params)}`;
  try {
    const { fileName, data } = await getFileBlob(url, token);
    if (!fileName) {
      errorNotification("The requested file is not available!!")
      return undefined;
    }
    return data;
  } catch (error: unknown) {
    console.log(`Error while downloading data: ${error}`);
    return null;
  }
};
