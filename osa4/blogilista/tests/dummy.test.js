const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

  describe('total likes', () => {
    const listWithManyBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f1',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 100,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has many blogs', () => {
      const result = listHelper.totalLikes(listWithManyBlogs)
      expect(result).toBe(110)
    })
  })

  describe('largest like amount', () => {
    const blogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          },
          {
            _id: '5a422aa71b54a676234d17f1',
            title: 'Jippikaijei',
            author: 'Ed',
            url: 'http://www.google.com',
            likes: 100,
            __v: 0
          },
          {
            _id: '5a422aa71b54a676234d17f7',
            title: 'This is not biggest',
            author: 'Auto',
            url: 'http://www.yahoo.com',
            likes: 5,
            __v: 0
          }  
    ]
  
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
        _id: '5a422aa71b54a676234d17f1',
        title: 'Jippikaijei',
        author: 'Ed',
        url: 'http://www.google.com',
        likes: 100,
        __v: 0
      })
  })