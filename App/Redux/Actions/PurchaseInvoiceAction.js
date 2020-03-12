import axios from "axios"
import {  BASE_URL, PURCHASE_SCREEN_BASE_URL} from "../api"
import { GET_PURCHASE_INVOICES, GET_PURCHASE_INVOICE_DETAIL , GET_PURCHASE_RETURN_INVOICE} from "../types"


export function getPurchaseInvoices(token, params) {

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
    .get(`/vansale/return/invoices`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_PURCHASE_INVOICES,
    payload: request,
  }
}

export function getPurchaseReturnInvoice(token, params) {
  const axiosInstance = axios.create({
    baseURL: `${PURCHASE_SCREEN_BASE_URL}`,
    timeout: 2000,
    headers: {
      Authorization: `Bearer ${token}`,
      "cache-control": "no-cache",
      "Content-Type": "application/json",
    },
  })

//   Purchase Return Invoice API
//   https://fgmmdev.com/api/v1/vansale/purchase-return-invoices

  const request = axiosInstance
    .get(`purchase-return-invoices`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_PURCHASE_RETURN_INVOICE,
    payload: request,
  }
}

export function getDetailsOfPurchaseInvoice(token, params) {
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
    type: GET_PURCHASE_INVOICE_DETAIL,
    payload: request,
  }
}

export function getDetailsOfInvoiceFromCache(data) {
  return {
    type: GET_PURCHASE_INVOICE_DETAIL,
    payload: data
  }
}


export function getPurchaseInvoicesFromCache(data) {
  return {
    type: GET_PURCHASE_INVOICES,
    payload: data,
  }
}

export function getPurchaseReturnInvoiceFromCache(data) {
  return {
    type: GET_PURCHASE_RETURN_INVOICE,
    payload: data,
  }
}
