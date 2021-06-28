/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { constantRouterMap } from '@/config/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers'
// import storage from 'store'
import { MODULES } from '@/store/mutation-types'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    modules_menus: [],
    fullScreen: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_MODULES: (state, menus) => {
      state.modules_menus = menus
    },
    SET_FULL_SCREEN: (state, data) => {
      state.fullScreen = data
    }
  },
  actions: {
    LoadFullRoute({ commit }, data) {
      commit('SET_FULL_SCREEN', data)
    },

    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { token } = data
        generatorDynamicRouter(token).then(res => {
          const { AllApps, routers } = res
          // storage.set(MODULES, AllApps)
          commit('SET_MODULES', AllApps)
          commit('SET_ROUTERS', routers)
          resolve()
        })
      })
    }
  }
}

export default permission
