import { login } from '@/api/login'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import storage from 'store'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.data
          const user = {
            userName: userInfo.user_name,
            userType: userInfo.user_type,
            token: result.token,
            functionList: result.func_list || []
          }
          storage.set(ACCESS_TOKEN, result.token)
          storage.set(USER_INFO, user)
          commit('SET_TOKEN', result.token)
          commit('SET_ROLES', user.functionList)
          commit('SET_INFO', user)
          commit('SET_NAME', { name: user.userName, welcome: welcome() })
          commit('SET_AVATAR', '/avatar2.jpg')
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        storage.remove(ACCESS_TOKEN)
        storage.remove(USER_INFO)
        resolve()
      })
    }
  }
}

export default user
