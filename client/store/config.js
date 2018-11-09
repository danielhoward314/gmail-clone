/**
 * ACTION TYPES
 */

const EMAIL_TYPE = 'EMAIL_TYPE'
const SIDEBAR_COLLAPSED = 'SIDEBAR_COLLAPSED'
const SELECTED_CONTACT ='SELECTED_CONTACT'
const DRAFT_OPEN = 'DRAFT_OPEN'
const DRAFT_CLOSE = 'DRAFT_CLOSE'
const PAGE_NUM = 'PAGE_NUM'

/**
 * INITIAL STATE
 */
const defaultState = {
  sidebarCollapsed: false,
  selectedEmailType: 'inbox',
  view: 'preview',
  selectedContact: null,
  closeDraft: 'unasked',
  pageNum: 1
}

/**
 * ACTION CREATORS
 */

const switchEmailType = (payload) => ({type: EMAIL_TYPE, payload})
const toggleSidebar = (config) => ({type: SIDEBAR_COLLAPSED, config})
const selectContact = (config) => ({type: SELECTED_CONTACT, config})
const openDraft = (config) => ({type: DRAFT_OPEN, config})
const closeDraft = (config) => ({type: DRAFT_CLOSE, config})
const switchPage = (config) => ({type: PAGE_NUM, config})

/**
 * THUNK CREATORS
 */

export const emitConfig = (config, flag, view) => dispatch => {
  if(flag === 'emailType') {
    return dispatch(switchEmailType({config, view}))
  } else if (flag === 'sidebar') {
      return dispatch(toggleSidebar(config))
  } else if (flag === 'contact') {
      return dispatch(selectContact(config))
  } else if (flag === 'draft') {
      return dispatch(openDraft(config))
  } else if (flag === 'pageNum') {
    return dispatch(switchPage(config))
  } else if (flag === 'closeDraft') {
    return dispatch(closeDraft(config))
  }
}

/**
 * REDUCER
 */

export default function(state = defaultState, action) {
  switch (action.type) {
    case EMAIL_TYPE: {
      return {
        ...state,
        selectedEmailType: action.payload.config,
        view: action.payload.view
      };
    }
    case SIDEBAR_COLLAPSED: {
      return {
        ...state,
        sidebarCollapsed: action.config
      };
    }
    case SELECTED_CONTACT: {
      return {
        ...state,
        selectedContact: action.config
      };
    }
    case DRAFT_CLOSE: {
      return {
        ...state,
        closeDraft: action.closeDraft,
        view: action.view
      };
    }
    default: {
      return state;
    }
  }
}
