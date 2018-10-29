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
  inbox: [],
  sent: [],
  draft: [],
  oneInbox: [],
  oneSent: [],
  oneDraft: [],
}

/**
 * ACTION CREATORS
 */
const getInbox = (inbox) => ({type: GET_INBOX, inbox})
const getSent = (sent) => ({type: GET_SENT, sent})
const getDraft = (draft) => ({type: GET_DRAFT, draft})
const getOneInbox = (oneInbox) => ({type: ONE_INBOX, oneInbox})
const getOneSent = (oneSent) => ({type: ONE_SENT, oneSent})
const getOneDraft = (oneDraft) => ({type: ONE_DRAFT, oneDraft})
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
        inbox: action.inbox
      };
    }
    case GET_SENT: {
      return {
        ...state,
        sent: action.sent
      };
    }
    case GET_DRAFT: {
      return {
        ...state,
        draft: action.draft
      };
    }
    case ONE_INBOX: {
      return {
        ...state,
        oneInbox: action.oneInbox
      };
    }
    case ONE_SENT: {
      return {
        ...state,
        oneSent: action.oneSent
      };
    }
    case ONE_DRAFT: {
      return {
        ...state,
        oneDraft: action.oneDraft
      };
    }
    default: {
      return state;
    }
  }
}
