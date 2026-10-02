import { API_ENDPOINT_MAIN, postData } from "../../api/commons";
// business and underwriotten
export const getBuisnessPlanListApi = async (reassetid: number, misDate: string, token: string): Promise<any | any | null> => {
  const params = {
    reassetid,
    misDate,
  };
  try {
    const url = `${API_ENDPOINT_MAIN}/cashflow/getCashFlowDetails`;
    const res = await postData(url, params, token);
    return res;
  } catch (error) {
    console.log(`Error while getting Investment Summary: ${error}`);
    return null;
  }
};

// Miss dates filters
export const getMisdatesFiltersAPI = async (reassetid: number, token: string) => {
  const data = {
    reassetid,
  };
  try {
    const url = `${API_ENDPOINT_MAIN}/cashflow/getCashFlowMisDates`;
    const res: any = await postData(url, data, token);
    return res;
  } catch (error) {
    console.log(`Error while fetching filter list: ${error}`);
    return null;
  }
};
