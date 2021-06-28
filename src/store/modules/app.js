import { loadLanguageAsync } from '@/locales'
import microActions from '@/micro/store'
import {
  // i18n
  APP_LANGUAGE,
  SIDEBAR_TYPE,
  TOGGLE_COLOR,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_HIDE_HEADER,
  TOGGLE_LAYOUT,
  TOGGLE_MOBILE_TYPE,
  TOGGLE_MULTI_TAB,
  TOGGLE_NAV_THEME,
  TOGGLE_WEAK,
  ANIMATESET,
  FULLSCREEN
} from '@/store/mutation-types'
import storage from 'store'

/* microActions.onGlobalStateChange((state, prevState) => {
  console.log('主应用观察者：改变前的 state 值为 ', prevState)
  console.log('主应用观察者：改变后的 state 值为 ', state)
}) */

const app = {
  state: {
    sideCollapsed: false,
    isMobile: false,
    theme: 'dark',
    layout: '',
    contentWidth: '',
    fixedHeader: false,
    fixedSidebar: false,
    autoHideHeader: false,
    isFullScreen: false,
    color: '',
    weak: false,
    multiTab: false,
    lang: 'zh-CN',
    _antLocale: {},
    menuMessages: {},
    animate: {},
    breadcrumb: true
  },
  mutations: {
    [SIDEBAR_TYPE]: (state, type) => {
      state.sideCollapsed = type
      storage.set(SIDEBAR_TYPE, type)
    },
    [TOGGLE_MOBILE_TYPE]: (state, isMobile) => {
      state.isMobile = isMobile
    },
    [TOGGLE_NAV_THEME]: (state, theme) => {
      state.theme = theme
      storage.set(TOGGLE_NAV_THEME, theme)
      microActions.setGlobalState({ changetype: 'layoutTheme', theme })
    },
    [TOGGLE_LAYOUT]: (state, mode) => {
      state.layout = mode
      storage.set(TOGGLE_LAYOUT, mode)
    },
    [TOGGLE_FIXED_HEADER]: (state, mode) => {
      state.fixedHeader = mode
      storage.set(TOGGLE_FIXED_HEADER, mode)
    },
    [TOGGLE_FIXED_SIDEBAR]: (state, mode) => {
      state.fixedSidebar = mode
      storage.set(TOGGLE_FIXED_SIDEBAR, mode)
    },
    [TOGGLE_CONTENT_WIDTH]: (state, type) => {
      state.contentWidth = type
      storage.set(TOGGLE_CONTENT_WIDTH, type)
    },
    [TOGGLE_HIDE_HEADER]: (state, type) => {
      state.autoHideHeader = type
      storage.set(TOGGLE_HIDE_HEADER, type)
    },
    [TOGGLE_COLOR]: (state, color) => {
      state.color = color
      storage.set(TOGGLE_COLOR, color)
      microActions.setGlobalState({ changetype: 'theme', primaryColor: color })
    },
    [TOGGLE_WEAK]: (state, mode) => {
      state.weak = mode
      storage.set(TOGGLE_WEAK, mode)
    },
    [APP_LANGUAGE]: (state, lang, antd = {}) => {
      state.lang = lang
      state._antLocale = antd
      storage.set(APP_LANGUAGE, lang)
      microActions.setGlobalState({ changetype: 'language', lang: lang })
    },
    [TOGGLE_MULTI_TAB]: (state, bool) => {
      storage.set(TOGGLE_MULTI_TAB, bool)
      state.multiTab = bool
    },
    SET_MENU_MESSAGES: (state, menuMessages) => {
      state.menuMessages = menuMessages
    },
    [FULLSCREEN]: (state, bol) => {
      storage.set(FULLSCREEN, bol)
      state.isFullScreen = bol
    },
    setAnimate(state, animate) {
      state.animate = animate
      storage.set(ANIMATESET, animate)
      microActions.setGlobalState({ changetype: 'animateChange', animate })
    },
    SET_Bread_Crumb(state, bol) {
      state.breadcrumb = bol
      storage.set('breadcrumb', bol)
      microActions.setGlobalState({ changetype: 'breadcrumbChange', breadcrumb: bol })
    }
  },
  actions: {
    setBreadcrumb({ commit }, bol) {
      commit('SET_Bread_Crumb', bol)
    },
    setMultiTab({ commit }, bol) {
      commit(TOGGLE_MULTI_TAB, bol)
    },
    setFullKey({ commit }, bol) {
      storage.set(FULLSCREEN, bol)
      commit(FULLSCREEN, bol)
    },
    setLang({ commit, state }, lang) {
      return new Promise((resolve, reject) => {
        commit(APP_LANGUAGE, lang)
        loadLanguageAsync(lang, state.menuMessages[lang])
          .then(() => {
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}

export default app
