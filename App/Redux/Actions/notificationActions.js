import axios from "axios"
import { CUSTOMER_API } from "../api"
import { GET_NOTIFICATION } from "../types"

export function getNotification(token, params) {

  const axiosInstance = axios.create({
    baseURL: `${CUSTOMER_API}`,
    timeout: 2000,
    headers: {
      Authorization: `Bearer ${token}`,
      "cache-control": "no-cache",
      "Content-Type": "application/json",
    },
  })

  const request = axiosInstance
    .get(`/notification`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_NOTIFICATION,
    payload: request,
  }
}

export function getNotificationFromCache(data) {
  return {
    type: GET_NOTIFICATION,
    payload: data,
  }
}
