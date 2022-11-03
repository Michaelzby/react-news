import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
}
// 设置一个初始化状态 记录了loading query 哪一页等等
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // 在这里初始化reducer
  // context里面初始化reducer

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
        // nbpages是一共有多少页 hits是搜索结果 就是实质内容
      })
    } catch (error) {
      console.log(error)
    }
  }

  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id })
  }
  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query })
  }
  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value })
  }
  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
  }, [state.query, state.page])
  // 有好多页的结果 我们这里操作页面加减变化 fetch的data也会改变

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
