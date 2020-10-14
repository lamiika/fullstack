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

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 'no blogs given'
  }

  const authorsLikes = blogs.reduce((acc, current) => {
    const author = current.author
    return { ...acc, [author]: { author: author, likes: acc[author] ? acc[author].likes + current.likes : current.likes } }
  }, {})

  const likesList = Object.keys(authorsLikes)
    .map(key => authorsLikes[key])

  const highestLikes = likesList.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current
  })

  return highestLikes
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}