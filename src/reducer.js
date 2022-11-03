import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  // 用一个reducer 表示各种状态  各种操作的变化
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true }
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        // 找到的时候 loading直接就false了
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      }
    case REMOVE_STORY:
      return {
        // 改变state里面其他的  其他的改 点点点就是不用改的那些
        ...state,
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      }
    case HANDLE_SEARCH:
      return { ...state, query: action.payload, page: 0 }
    case HANDLE_PAGE:
      if (action.payload === 'inc') {
        let nextPage = state.page + 1
        if (nextPage > state.nbPages - 1) {
          nextPage = 0
        }
        return { ...state, page: nextPage }
      }
      if (action.payload === 'dec') {
        let prevPage = state.page - 1
        if (prevPage < 0) {
          prevPage = state.nbPages - 1
        }
        return { ...state, page: prevPage }
      }
    default:
      throw new Error(`no mathching "${action.type}" action type`)
  }
}
export default reducer
