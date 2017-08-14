import * as APIUtil from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch =>
  APIUtil.fetchCategories().then(({ categories }) =>
    dispatch(receiveCategories(categories))
  )
