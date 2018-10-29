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

/**
 * INITIAL STATE
 */
const defaultState = {
  previewInbox: [],
  previewSent: [],
  previewDraft: [],
  detailInbox: [],
  detailSent: [],
  detailDraft: [],
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
/**
 * THUNK CREATORS
 */
export const getEmails = (flag, pageNum) => async dispatch => {
  try {
    const res = await axios.get(`/api/emails/${flag}/p/${pageNum}`)
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

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
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
    default: {
      return state;
    }
  }
}
