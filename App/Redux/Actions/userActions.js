import axios from "axios"
import { LOGIN_USER, LOGOUT_USER, UPDATE_PASSWORD, UPDATE_PROFILE, UPDATE_FCM } from "../types"
import { LOGIN_API, CUSTOMER_API, BASE_URL, UPDATE_PROFILE_BASE_URL } from "../api"

export function loginUser(data) {
  var config = {
    headers: {
      Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1NmI2ZDEzZTcwODBmOGIxNWI4NmI5OWQxZDMxZWJkYmZkOTI1NDg3NjRlODM0MjgwMjJmMjMwOTM2ZjZiN2QxNDc1Y2UwNzEwMmNjMzUzIn0.eyJhdWQiOiIxIiwianRpIjoiZjU2YjZkMTNlNzA4MGY4YjE1Yjg2Yjk5ZDFkMzFlYmRiZmQ5MjU0ODc2NGU4MzQyODAyMmYyMzA5MzZmNmI3ZDE0NzVjZTA3MTAyY2MzNTMiLCJpYXQiOjE1NjkxNDk4MjksIm5iZiI6MTU2OTE0OTgyOSwiZXhwIjoxNjAwNzcyMjI5LCJzdWIiOiIyNTgiLCJzY29wZXMiOltdfQ.UKkM65c3yJSpbK7tjLl8-t3HyFq5XvAxZH2qYuzgLfN7pNPIYv-Hk3_ewgWIqoJ7-atGTsECqJLLcQ2KUOZjPvwDVvIgVMS2X67Ui0X6Y6SHbX5kp8uz4Fqij5JtPHDTYE2N6S_LyAx1f3j77UxhY-AVRZUM242AIPGRguI2Zosjlc_Ds42U_qV9YvZOSpnqkb7_LoVKY8EjLDd3Co3HoapHoSYj662upw4naiJfeVhhRDIxIB08AnnFG7ONDOwd8w-UdKdHnGcZ9G6zsWWZgEoz3My62y_nYXbALStSc43WjQGwtgGrrtv9DW23c9qJxX5xqCeD-U4GtbkfVRo85KpMJxAJAMZR82o1Scc6Lx4-7Mazlub8Q1Pe95CHURbWHL9vVjJuWBQ5325RzElv0Gx_VXYRYLuOHLhhkMLi_i7ZibUM7cDnYTTasqqg4malpidGjwVPOkz71tb7k-iouJaAj2LT708UVplM5egOcLXKfd8dhu7juQWy1CPqZgI6jr1vEldkTkRjdoF-Pie-rnLwkpARXHzphzDAn1vSMRBlNz5ByXCcKTvaDLfk5ACMIG1vlRPaAzGb-l5-u9WS7ppltT6JUMNeE8zak0Vv2KlC-V5GYVfbqatS9W6GlsLcq5oYVbqaBsRBrubDgTs1LYY1GaZR-JeX8s4gSPptt-U",
    },
  }
  const request = axios
    .post(`${LOGIN_API}`, data, config)
    .then(res => res.data)
    .catch(err => console.log("error : \n\n", err))
  return {
    type: LOGIN_USER,
    payload: request,
  }
}

export function logoutUser() {
  const request = {}
  return {
    type: LOGOUT_USER,
    payload: request,
  }
}

export function cacheUser(data) {
  return {
    type: LOGIN_USER,
    payload: data,
  }
}

export function updatePassword(token, params) {
  const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "cache-control": "no-cache",
      "Content-Type": "application/json",
    },
  })

  const request = axiosInstance
    .put(`/update-password`, JSON.stringify(params))
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: UPDATE_PASSWORD,
    payload: request,
  }
}

export function editProfile(token, params) {
  console.log(token, params);
  const axiosInstance = axios.create({
    baseURL: `${UPDATE_PROFILE_BASE_URL}`,
    // timeout: 2000,
    headers: {
      Authorization: `Bearer ${token}`,
      "cache-control": "no-cache",
      "Content-Type":"multipart/form-data"
    },
  })

  const request = axiosInstance
    .post(`update-profile`, params
    )

    .then(res =>
     res.data)
    .catch(err => {
      console.log(err)
    })
  return {
    type: UPDATE_PROFILE,
    payload: request,
  }
}


export function aboutUs(token, params) {

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
    .get(`/about`, {
      params,
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: "ABOUT_US",
    payload: request,
  }
}


export function updateFcmToken(token, params) {
  const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "cache-control": "no-cache",
      "Content-Type": "application/json",
    },
  })

  const request = axiosInstance
    .post(`/device/token/save`, JSON.stringify(params))
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })

  return {
    type: UPDATE_FCM,
    payload: request,
  }
}
