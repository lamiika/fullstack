import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return sortByLikes(action.data)
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      const updatedBlogs = state.map(blog =>
        blog.id !== action.data.id ? blog : action.data)
      return sortByLikes(updatedBlogs)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

const sortByLikes = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
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

export const initializeBlogComments = (id) => {
  return async dispatch => {
    try {
      const blogWithComments = await blogService.getComments(id)
      
      dispatch({
        type: 'UPDATE_BLOG',
        data: blogWithComments
      })
      return blogWithComments
    } catch (exception) {
      console.log(exception)
      return false
    }
  }
}

export const createComment = (comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.createComment(comment)

      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })

      return updatedBlog
    } catch (exception) {
      console.log(exception)
      return false
    }
  }
}

export default blogReducer