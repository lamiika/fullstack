import React from 'react'

const BlogForm = ({ addBlog, newBlog, handleBlogChange }) => (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input
        type="text"
        value={newBlog.title}
        onChange={event => handleBlogChange(event, 'title')}
      />
    </div>
    <div>
      author:
      <input
        type="text"
        value={newBlog.author}
        onChange={event => handleBlogChange(event, 'author')}
      />
    </div>
    <div>
      url:
      <input
        type="text"
        value={newBlog.url}
        onChange={event => handleBlogChange(event, 'url')}
      />
    </div>
    <button type="submit">create</button>
  </form>
)

export default BlogForm