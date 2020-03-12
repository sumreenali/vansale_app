import axios from "axios"
import { CUSTOMER_API, BASE_URL , POINT_SCREEN_BASE_URL} from "../api"
import { GET_BALANCE, GET_POINT_BALANCE, GET_POINT_HISTORY, UPDATE_REDEEM } from "../types"

export function getBalance(token, params) {
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
    .get(`/balances`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_BALANCE,
    payload: request,
  }
}

export function getBalanceFromCache(data) {
  return {
    type: GET_BALANCE,
    payload: data || [],
  }
}

export function getPointOffers(token, params) {
  console.log(token, params)
  const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 2000,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  const request = axiosInstance
    .get(`/point/offers`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log("mera error",err)
    })

  return {
    type: GET_POINT_BALANCE,
    payload: request,
  }
}

export function getPointOffersFromCache(data) {
  return {
    type: GET_POINT_BALANCE,
    payload: data || [],
  }
}

export function getPointHistory(token, params) {
  console.log(token, params)
  const axiosInstance = axios.create({
    baseURL: `${POINT_SCREEN_BASE_URL}`,
    timeout: 2000,
    headers: {
      Authorization: `Bearer ${token}`,
      "cache-control": "no-cache",
      "Content-Type": "application/json",
    },
  })

  const request = axiosInstance
    .get(`history`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_POINT_HISTORY,
    payload: request,
  }
}

export function updateRedeemAction(token, params) {
  console.log(token, params)
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
    .get(`/redeemed/points`, {
      params
    }
    )
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

    return {
      type: UPDATE_REDEEM,
      payload: request,
    }

}

export function getPointHistoryFromCache(data) {
  return {
    type: GET_POINT_HISTORY,
    payload: data || [],
  }
}
