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

module.exports = {
  dummy, totalLikes, favoriteBlog
}