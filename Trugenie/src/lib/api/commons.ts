import dayjs from "dayjs";
import { env } from "../../env";
import { sessionTimeoutModal } from "../../modules/Components/SessionTimeoutModal";
import appStore from "../common/store";
import { logout, setActivityTimestamp } from "../services/hdfc_login/actions";

export const API_BASEURL = env.VITE_REACT_APP_BASE_URL;
// export const API_BASEURL = import.meta.env.VITE_REACT_APP_BASE_URL;
export const PATH = "/DashboardAPI/";
export const API_ENDPOINT_MAIN = env.VITE_REACT_APP_HDFC_BASE_URL;
export const API_ENDPOINT = `${API_ENDPOINT_MAIN}covenant/`;
export const NOC_DASHBOARD_ENDPOINT = `${API_ENDPOINT_MAIN}/noc`;
export const CONSTRUCTION_DASHBOARD_ENDPOINT = `${API_ENDPOINT_MAIN}/construction`;
export const DASHBOARD_REMARK_ENDPOINT = `${API_ENDPOINT_MAIN}/dashboardremarks`;
export const HDFC_API_ENDPOINT = env.VITE_REACT_APP_HDFC_BASE_URL;
export const VERSION_TOKEN = env.VITE_REACT_APP_GET_VERSION_TOKEN;

type Header = {
  "Content-Type"?: string;
  "Accept-Encoding"?: string;
  Accept: string;
  Authorization?: string;
  "Access-Control-Allow-Origin"?: string;
  "Access-Control-Allow-Headers"?: string;
};

export const getBlobFilename = (response: Response) => {
  const contentDisposition = response.headers.get("Content-Disposition");
  let filename = contentDisposition?.split("filename=")[1];

  if (filename) {
    filename = filename.replace(/"/g, "");
  }
  return filename;
};

export const getParams = (params: object) => {
  const url_params = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => key + "=" + value.toString())
    .join("&");
  return url_params.length > 0 ? "?" + url_params : "";
};

export const generateHeader = (token?: string, contentType = "application/json; charset=utf-8") => {
  let header: Header = {
    Accept: contentType,
    "Accept-Encoding": "gzip",
    "Access-Control-Allow-Origin": 'http://localhost:5173',//"*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
  };

  if (contentType) {
    header["Content-Type"] = contentType;
  }
  if (token) {
    header = {
      ...header,
      Authorization: `Bearer ${token}`,
    };
  }
  return header;
};

export const generateHeaderMultipart = (token?: string) => {
  let auth = {};
  if (token) {
    auth = {
      Authorization: `Bearer ${token}`,
    };
  }
  const header = new Headers({
    Accept: "application/json",
    "Accept-Encoding": "gzip",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    ...auth,
  });

  return header;
};

export const postData = (url: string = API_ENDPOINT, data: any, token?: string, method = "POST") => {
  console.log("data======",data)
  return fetch(url, {
    method: method,
    headers: generateHeader(token),
    mode: "cors",
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(async response => {
      if (!response.ok) {
        throw await response.json();
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
};

// Function to fetch and download the report
export const exportReport = (url: string = HDFC_API_ENDPOINT, token?: string, data?: any, contentType?: string) => {
  return fetch(url, {
    method: data ? "POST" : "GET",
    headers: generateHeader(token, contentType),
    body: data ? JSON.stringify(data) : null,
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error("Failed to download report");
      }
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "report";
      if (contentDisposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, "");
        }
      }
      const blob = await response.blob();
      return { blob, filename };
    })
    .catch(error => {
      throw new Error("Failed to download report");
    });
};

export const postDataMultipart = (url: string = HDFC_API_ENDPOINT, data: FormData, token?: string,) => {
  return fetch(url, {
    method: "POST",
    headers: generateHeaderMultipart(token),
    body: data,
  })
    .then(async response => {
      if (!response.ok) {
        // return response.json();
        const responseData = await response.json();
        throw await { ...responseData, code: response.status };
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
};

export const postDownloadFile = (url: string = HDFC_API_ENDPOINT, data?: any, token?: string, contentType?: string) => {
  return fetch(url, {
    method: "POST",
    headers: generateHeader(token, contentType ?? "application/octet-stream; charset=utf-8"),
    body: data,
  })
    .then(async response => {
      if (!response.ok) {
        const responseData = await response.json();
        throw await { ...responseData, code: response.status };
      }
      const fileName = getBlobFilename(response);
      return {
        fileName: fileName,
        data: await response.blob(),
      };
    })
    .catch(error => {
      throw error;
    });
};

export const getData = (url: string = HDFC_API_ENDPOINT, token?: string, data?: any, contentType?: string) => {
  return fetch(url, {
    method: data ? "POST" : "GET",
    headers: generateHeader(token, contentType),
    body: data ? JSON.stringify(data) : null,
  })
    .then(async response => {
      if (!response.ok) {
        throw await response.json();
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
};

export const getFileBlob = (url: string = HDFC_API_ENDPOINT, token?: string, contentType = "application/octet-stream; charset=utf-8") => {
  return fetch(url, {
    method: "GET",
    // headers: generateHeader(token, contentType),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      const fileName = getBlobFilename(response);
      return {
        fileName: fileName,
        data: await response.blob(),
      };
    })
    .catch(error => {
      throw error;
    });
};

export const postDownloadFileWithSign = (url: string = HDFC_API_ENDPOINT, data?: any, token?: string) => {
  return fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  })
    .then(async response => {
      if (!response.ok) {
        const responseData = await response.json();
        throw await { ...responseData, code: response.status };
      }
      const fileName = getBlobFilename(response);

      return {
        fileName: fileName,
        data: await response.blob(),
      };
    })
    .catch(error => {
      throw error;
    });
};

const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
  const [resource, config] = args;
  const response = await originalFetch(resource, config);
  const { store } = appStore;
  const isLoggedIn: boolean = store?.getState()?.hdfcAuth.accessToken !== undefined;
  if (isLoggedIn) {
    store.dispatch(setActivityTimestamp(dayjs().valueOf()));
  }
  if (isLoggedIn && response.status === 401) {
    await sessionTimeoutModal("Unauthorised Access", "redirected to login page");
    // store.dispatch(resetLogoutTimer());
    store.dispatch(logout(store?.getState()?.hdfcAuth.accessToken));
    // window.location.reload();
  }
  return response;
};
