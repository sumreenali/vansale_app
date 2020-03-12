import axios from "axios"
import { BASE_URL } from "../api"
import { GET_VANSALES, GET_VANSALES_DROPDOWN,GET_VANSALES_REDEEMED, REDEEM_VANSALE_POINT } from "../types"

export function getVanSales(token, params) {
  console.log(params)
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
    .get(`/vansale/customers`, {
      params
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_VANSALES,
    payload: request,
  }
}

export function getVanSalesRedeemedPointsList(token, user_id, status) {
 console.log("qwe LL ", user_id)

  console.log(token, user_id, status)
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
    .get(`/point/history?status=${status}&user_id=${user_id}`)
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_VANSALES_REDEEMED,
    payload: request,
  }
}

//Point List redeem
export function redeemVansalePointList(token, params) {
 

  console.log(token, "is the token")
  console.log(params, "is the list of array")
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
    .post(`/redeem/request/points`, params)
    .then(res => console.log(res))
    .catch(err => {
      console.log(err)
    })

  return {
    type: REDEEM_VANSALE_POINT,
    payload: request,
  }
}


export function getVanSalesForDropDown(token, params) {
  console.log(params)
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
    .get(`/vansales`, {
      params
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_VANSALES_DROPDOWN,
    payload: request,
  }
}

export function getVanSalesDropdownFromCache(data) {
  return {
    type: GET_VANSALES_DROPDOWN,
    payload: data,
  }
}


export function getVanSalesFromCache(data) {
  return {
    type: GET_VANSALES,
    payload: data,
  }
}
