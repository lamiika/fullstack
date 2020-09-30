const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, { likes }) => sum + likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 'no blogs given'
  }

  const reducer = (prev, current) => prev.likes > current.likes ? prev : current

  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 'no blogs given'
  }

  const authors = blogs.map(blog => blog.author)

  const occouranceObject = authors.reduce((acc, current) => {
    return { ...acc, [current]: { author: current, blogs: acc[current] ? acc[current].blogs + 1 : 1 } }
  }, {})

  const occouranceList = Object.keys(occouranceObject)
    .map(key => occouranceObject[key])

  const highestOccourance = occouranceList.reduce((prev, current) => {
    return prev.blogs > current.blogs ? prev : current
  })

  return highestOccourance
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}