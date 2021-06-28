import request from './request'

const userApi = {
  Login: '/api/v1/auth/login',
  Logout: '/auth/logout',
  // getWebConfig: '/webconfig',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/api/v1/auth/userMenu',
  UpdatePassword: '/api/v1/auth/user/chpwd'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export const getWebConfig = (parameter = {}) =>
  request({
    url: userApi.getWebConfig,
    method: 'get',
    data: parameter
  })

export function getCurrentUserNav() {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * UpdatePassword
 * 修改密码
 */
export const UpdatePassword = (parameter = {}) =>
  request({
    url: userApi.UpdatePassword,
    method: 'post',
    data: parameter
  })
