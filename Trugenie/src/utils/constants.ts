import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { env } from "../env";
export const TIMEZONE = "Asia/Kolkata";
export const BASE_PATH = "/covenant";
export const DEFAULT_ALL = "ALL";
export const NUMBER_SYSTEM = "INR mn";
export const storageKeys = {
  root: import.meta.env.VITE_REACT_APP_ROOT_KEY,
  auth: import.meta.env.VITE_REACT_APP_AUTH_KEY,
  salesMonitoring: import.meta.env.VITE_REACT_APP_SALES_MONITORING_KEY,
  student: import.meta.env.VITE_REACT_APP_STUDENT_KEY,
  customerGroup: import.meta.env.VITE_REACT_APP_CUSTOMER_GROUP_KEY,
  project: import.meta.env.VITE_REACT_APP_PROJECT_KEY,
  sales: import.meta.env.VITE_REACT_APP_SALES_KEY,
  externalNoc: import.meta.env.VITE_REACT_EXTERNAL_NOC_KEY,
  customerInvestee: import.meta.env.VITE_REACT_CUSTOMER_INVESTEE_KEY,
  zone: import.meta.env.VITE_REACT_ZONE_KEY,
  region: import.meta.env.VITE_REACT_REGION_KEY,
  location: import.meta.env.VITE_REACT_LOCATION_KEY,
  internalUser: import.meta.env.VITE_REACT_INTERNAL_USER_KEY,
  externalUser: import.meta.env.VITE_REACT_EXTERNAL_USER_KEY,
  projectSetup: import.meta.env.VITE_REACT_PROJECT_SETUP_USER_KEY,
  common: import.meta.env.VITE_REACT_COMMON_USER_KEY,
  manageRequest: import.meta.env.VITE_REACT_MANAGE_REQUEST_USER_KEY,
  commonMonitoring: import.meta.env.VITE_REACT_COMMON_MONITORING_USER_KEY,
  summary: import.meta.env.VITE_REACT_APP_SUMMARY_KEY,
  investment:import.meta.env.VITE_REACT_APP_INVESTMENT_KEY,
  lender: import.meta.env.VITE_REACT_APP_LENDER_KEY,
  debenture: import.meta.env.VITE_REACT_APP_DEBENTURE_KEY,
  pmc: import.meta.env.VITE_REACT_APP_PMC_KEY,
  funds: import.meta.env.VITE_REACT_APP_FUNDS_KEY,
  client: import.meta.env.VITE_REACT_APP_CLIENT_KEY,
};
export const secureKeys = {
  root: import.meta.env.TB_ROOT_SECURE_KEY,
  auth: import.meta.env.TB_AUTH_SECURE_KEY,
};

export const PROMPT_TIME_BEFORE_IDLE = env.VITE_REACT_PROMPT_TIME_BEFORE_IDLE_MS ? Number(env.VITE_REACT_PROMPT_TIME_BEFORE_IDLE_MS) : 180000; // 3 min
export const IDLE_TIMEOUT = env.VITE_REACT_IDLE_TIMEOUT_MS ? Number(env.VITE_REACT_IDLE_TIMEOUT_MS) : 600000; // 10 mins

dayjs.extend(LocalizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
// dayjs.tz.setDefault(TIMEZONE);
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);

export const DATE_TIME_FORMAT = "lll";
export const DATE_FORMAT = "DD MMM YYYY";
export const DATE_TIME_FORMAT_WITH_SECONDS = "YYYY-MM-DD";
export const DATE_TIME_FORMAT_WITH_HH_MM_SS = "D MMM YYYY hh:mm:ss";
export const specialChars = "!@#$%^&*()_+{}[]|;:,.<>?";
export const alphanumericspecialChars500regex = !/^[\w\d\s\S]{1,500}$/;
