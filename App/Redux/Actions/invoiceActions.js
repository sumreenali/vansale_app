import axios from "axios"
import { BASE_URL } from "../api"
import { GET_PURCHASE_INVOICE, GET_RETURN_INVOICE, GET_INVOICE_DETAIL } from "../types"

export function getPurchaseInvoice(token, params) {

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
    .get(`/vansale/sales/invoices`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_PURCHASE_INVOICE,
    payload: request,
  }
}

export function getReturnInvoice(token, params) {
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
    .get(`/vansale/return/invoices`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_RETURN_INVOICE,
    payload: request,
  }
}


export function getDetailsOfInvoice(token, params) {
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
    .get(`invoices/details`, {
      params,
    })
    .then(res =>res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_INVOICE_DETAIL,
    payload: request,
  }
}

export function getDetailsOfInvoiceFromCache(data) {
  return {
    type: GET_INVOICE_DETAIL,
    payload: data
  }
}


export function getPurchaseInvoiceFromCache(data) {
  return {
    type: GET_PURCHASE_INVOICE,
    payload: data,
  }
}

export function getReturnInvoiceFromCache(data) {
  return {
    type: GET_RETURN_INVOICE,
    payload: data,
  }
}
