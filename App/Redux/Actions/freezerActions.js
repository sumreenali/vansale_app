import axios from "axios"
import { BASE_URL } from "../api"
import { GET_FREEZERS, GET_CLAIM_CATEGORY, GET_FREEZER_LIST, GET_CLAIM } from "../types"

export function getClaimCategory(token, params) {
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
    .get(`/claim/categories`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_CLAIM_CATEGORY,
    payload: request,
  }
}

export function getClaimCategoryFromCache(data) {
  return {
    type: GET_CLAIM_CATEGORY,
    payload: data,
  }
}


export function getUserFreezerList(token, params) {
  const axiosInstance = axios.create({
    baseURL: `https://fgmmdev.com/api/v1`,
    timeout: 2000,
    headers: {
      Authorization: `Bearer ${token}`,
      "cache-control": "no-cache",
      "Content-Type": "application/json",
    },
  })

  const request = axiosInstance
    .get(`/freezer/groups`, {
      params: {
        
      }
    })
    .then(res =>console.log(res))
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_FREEZER_LIST,
    payload: request,
  }
}


export function getUserFreezerListFromCache(data) {
  return {
    type: GET_FREEZER_LIST,
    payload: data,
  }
}

export function getClaim(token, params) {
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
    .get(`/claims`, params)
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: GET_CLAIM,
    payload: request,
  }
}

export function getClaimFromCache(data) {
  return {
    type: GET_CLAIM,
    payload: data,
  }
}
