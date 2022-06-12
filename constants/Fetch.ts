export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const FETCH_URLs = {
  SAVE_CAMERA: 'https://coastalfun.epiccodewizard2.repl.co/image/save',
  GET_ALL_COLLECTIONS: 'https://coastalfun.epiccodewizard2.repl.co/collections/all',
  GET_COLLECTIONS: (uid: string) => {
    return `https://coastalfun.epiccodewizard2.repl.co/collections/get/user/${uid}`
  },
  GET_COLLECTION: (cid: string) => {
    return `https://coastalfun.epiccodewizard2.repl.co/collections/get/${cid}`
  },
  POST_COLLECTION: 'https://coastalfun.epiccodewizard2.repl.co/collections/create',
  CREATE_EVENT: 'https://coastalfun.epiccodewizard2.repl.co/events/create',
  GET_EVENT: (eid: string) => {
    return `https://coastalfun.epiccodewizard2.repl.co/events/get/${eid}`
  },
  COMMENT_EVENT: (eid: string) => {
    return `https://coastalfun.epiccodewizard2.repl.co/events/comment/${eid}`
  },
  RATE_EVENT: (eid: string) =>  {
    return `https://coastalfun.epiccodewizard2.repl.co/events/rate/${eid}`
  },
  JOIN_EVENT: (eid: string) => {
    return `https://coastalfun.epiccodewizard2.repl.co/events/join/${eid}`
  },
  GET_EVENTS: 'https://coastalfun.epiccodewizard2.repl.co/events/all',
  LOG_TRASH: (uid: string) => {
    return `https://coastalfun.epiccodewizard2.repl.co/users/trash/${uid}`
  },
  GET_TRASH: (uid: string) => {
    return `https://coastalfun.epiccodewizard2.repl.co/users/get/${uid}`
  }
}
