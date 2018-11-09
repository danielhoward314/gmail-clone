import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_INBOX = 'GET_INBOX'
const GET_SENT = 'GET_SENT'
const GET_DRAFT = 'GET_DRAFT'
const ONE_INBOX = 'ONE_INBOX'
const ONE_SENT = 'ONE_SENT'
const ONE_DRAFT = 'ONE_DRAFT'
const COMPOSE_DRAFT = 'COMPOSE_DRAFT'
const CREATE_INBOX = 'CREATE_INBOX'
const CREATE_SENT = 'CREATE_SENT'
const CREATE_DRAFT = 'CREATE_DRAFT'
const DELETE_DRAFT = 'DELETE_DRAFT'

/**
 * INITIAL STATE
 */
const defaultState = {
  previewInbox: [],
  previewSent: [],
  previewDraft: [],
  detailInbox: {},
  detailSent: {},
  detailDraft: {},
  draftData: {}
}

/**
 * ACTION CREATORS
 */
const getInbox = (previewInbox) => ({type: GET_INBOX, previewInbox})
const getSent = (previewSent) => ({type: GET_SENT, previewSent})
const getDraft = (previewDraft) => ({type: GET_DRAFT, previewDraft})
const getOneInbox = (detailInbox) => ({type: ONE_INBOX, detailInbox})
const getOneSent = (detailSent) => ({type: ONE_SENT, detailSent})
const getOneDraft = (detailDraft) => ({type: ONE_DRAFT, detailDraft})
const populateDraft = (draftData) => ({type: COMPOSE_DRAFT, draftData})
const createInbox = (newInbox) => ({type: CREATE_INBOX, newInbox})
const createSent = (newSent) => ({type: CREATE_SENT, newSent})
const createDraft = (newDraft) => ({type: CREATE_DRAFT, newDraft})
const deleteDraft = (erasedDraft) => ({type: DELETE_DRAFT, erasedDraft})
/**
 * THUNK CREATORS
 */
export const getEmails = (flag, userId, pageNum) => async dispatch => {
  try {
    const res = await axios.get(`/api/emails/${flag}/user/${userId}/p/${pageNum}`)
    if(flag === 'inbox') {
      return dispatch(getInbox(res.data))
    } else if (flag === 'sent') {
        return dispatch(getSent(res.data))
    } else if (flag === 'draft') {
        return dispatch(getDraft(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}

export const getEmail = (flag, id) => async dispatch => {
  try {
    const res = await axios.get(`/api/emails/${flag}/id/${id}`)
    if(flag === 'inbox') {
      return dispatch(getOneInbox(res.data))
    } else if (flag === 'sent') {
        return dispatch(getOneSent(res.data))
    } else if (flag === 'draft') {
        return dispatch(getOneDraft(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}

export const postEmail = (flag, emailData, draftId = null) => async dispatch => {
  try {
    if(flag === 'inbox') {
      const res = await axios.post(`/api/emails/${flag}`, emailData)
      return dispatch(createInbox(res.data))
    } else if (flag === 'sent') {
        const res = await axios.post(`/api/emails/${flag}`, emailData)
        return dispatch(createSent(res.data))
    } else if (flag === 'draft' && draftId === null) {
        const res = await axios.post(`/api/emails/${flag}`, emailData)
        return dispatch(createDraft(res.data))
    } else if (flag === 'draft' && draftId !== null) {
        const res = await axios.delete(`/api/emails/${flag}/${draftId}`)
        return dispatch(deleteDraft(res.data))
  }
  } catch (err) {
    console.error(err)
  }
}

export const emitDraft = (draftData) => dispatch => {
    return dispatch(populateDraft(draftData))
}

/**
 * REDUCER
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_INBOX: {
      return {
        ...state,
        previewInbox: action.previewInbox
      };
    }
    case GET_SENT: {
      return {
        ...state,
        previewSent: action.previewSent
      };
    }
    case GET_DRAFT: {
      return {
        ...state,
        previewDraft: action.previewDraft
      };
    }
    case ONE_INBOX: {
      return {
        ...state,
        detailInbox: action.detailInbox
      };
    }
    case ONE_SENT: {
      return {
        ...state,
        detailSent: action.detailSent
      };
    }
    case ONE_DRAFT: {
      return {
        ...state,
        detailDraft: action.detailDraft
      };
    }
    case COMPOSE_DRAFT: {
      return {
        ...state,
        draftData: action.draftData
      };
    }
    case CREATE_INBOX: {
      return {
        ...state,
        previewInbox: [...state.previewInbox, action.newInbox]
      };
    }
    case CREATE_SENT: {
      return {
        ...state,
        previewSent: [...state.previewSent, action.newSent]
      };
    }
    case CREATE_DRAFT: {
      return {
        ...state,
        previewDraft: [...state.previewDraft, action.newDraft]
      };
    }
    case DELETE_DRAFT: {
      return {
        ...state,
        previewDraft: [...state.previewDraft.filter(draft => draft.id !== action.erasedDraft.id)]
      };
    }
    default: {
      return state;
    }
  }
}
