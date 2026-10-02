import { HDFC_API_ENDPOINT, getData, postData } from "../../../api/commons";

export const getStudentListAPI = async () => {
  try {
    const url = `http://localhost:8080/api/items`;
    const res = await getData(url);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const addStudentAPI = async (token: string, id: number, name: string, description: string) => {
  try {
    const url = `http://localhost:8080/api/items`;
    const res = await postData(url, { id, name, description }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const editStudentAPI = async (token: string, id: number, name: string, description: string) => {
  try {
    console.log("studentid====",id,name,description)
    const url = `http://localhost:8080/api/items/${id}`;
    const res = await postData(url, {id,name, description }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const deleteStudentAPI = async (token: string, id: number) => {
  try {
    const url = `http://localhost:8080/api/items/delete/${id}`;
    const res = await postData(url,token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
