import axios from "axios"
import { BASE_URL } from "../api"
import {  GET_STOCK_LIST, GET_VANSALES_DROPDOWN } from "../types"

export function getStockList(token) {
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
    .get(`/vansale/stock`)
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_STOCK_LIST,
    payload: request,
  }
}

export function getVanStockListFromCache(data) {
    return {
      type: GET_STOCK_LIST,
      payload: data,
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
    .get(`/vansale/stock`, {
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


