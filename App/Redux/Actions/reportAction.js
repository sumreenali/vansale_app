import axios from "axios"
import { USER_REPORT, USER_REPORT_TITLE, USER_TOP_PRODUCTS_REPORT , Repor} from "../types"
import { BASE_URL,REPORT_SCREEN_BASE_URL } from "../api"


export function userReport(token, params) {
  console.log('user re:',token,params)
  const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 2000,
    headers: {
      Authorization: `Bearer ${token}`,
      "cache-control": "no-cache",
      "Content-Type": "application/json",
    },
  })

  const request = axiosInstance
    .get(`/report/detail`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: USER_REPORT,
    payload: request,
  }
}

export function userReportFromCache(data) {
  return {
    type: USER_REPORT,
    payload: data,
  }
}



export function userReportTitle(token, params) {
  const axiosInstance = axios.create({
    baseURL: `${REPORT_SCREEN_BASE_URL}`,
    timeout: 2000,
    headers: {
      Authorization: `Bearer ${token}`,
      "cache-control": "no-cache",
      "Content-Type": "application/json",
    },
  })

  const request = axiosInstance
    .get(`reports`, {
      // params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: USER_REPORT_TITLE,
    payload: request,
  }
}

export function userReportTitleFromCache(data) {
  console.log("cache data", data)
  return {
    type: USER_REPORT_TITLE,
    payload: data,
  }
}


export function userTopProductsReport(token, params) {
  console.log('user top products:',token,params)
  const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 2000,
    headers: {
      Authorization: `Bearer ${token}`,
      "cache-control": "no-cache",
      "Content-Type": "application/json",
    },
  })

  const request = axiosInstance
    .get(`/report/detail`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: USER_TOP_PRODUCTS_REPORT,
    payload: request,
  }
}

export function userTopProductsReportFromCache(data) {
  return {
    type: USER_TOP_PRODUCTS_REPORT,
    payload: data,
  }
}