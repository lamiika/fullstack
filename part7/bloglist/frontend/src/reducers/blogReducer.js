import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      const updatedBlogs = state.map(blog =>
        blog.id !== action.data.id ? blog : action.data)
      return updatedBlogs.sort((a, b) => b.likes - a.likes)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'CREATE_BLOG',
        data: newBlog,
      })
      return true
    } catch (exception) {
      console.log(exception)
      return false
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.update(blog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: likedBlog
      })
      return likedBlog
    } catch (exception) {
      console.log(exception)
      return false
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog
      })
      return true
    } catch (exception) {
      return false
    }
  }
}

export default blogReducer