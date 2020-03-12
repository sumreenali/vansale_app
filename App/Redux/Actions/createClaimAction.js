import axios from "axios"
import { BASE_URL } from "../api"
import {  CREATE_CLAIM } from "../types"

export function createClaim(token, params) {
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
    .post(`/claim/create`, params)
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: CREATE_CLAIM,
    payload: request,
  }
}

export function getClaimCategoryFromCache(data) {
  return {
    type: CREATE_CLAIM,
    payload: data,
  }
}
