import React from 'react'

import { useGlobalContext } from './context'

const Stories = () => {
  const { isLoading, hits, removeStory } = useGlobalContext()

  if (isLoading) {
    return <div className='loading'></div>
  }
  return (
    <section className='stories'>
      {hits.map((story) => {
        // 这里不用限制个数 hits帮我们弄好了一夜多少个
        const { objectID, title, num_comments, url, points, author } = story
        return (
          <article key={objectID} className='story'>
            <h4 className='title'>{title}</h4>
            <p className='info'>
              {points} points by <span>{author} | </span> {num_comments}{' '}
              comments
            </p>
            <div>
              <a
                href={url}
                className='read-link'
                target='_blank'
                // 新打开一个页面 就是详细内容的网页 url在这里是story里面的一个属性
                rel='noopener noreferrer'
              >
                read more
              </a>
              <button
                className='remove-btn'
                onClick={() => removeStory(objectID)}
                // 利用每个的id来remove
              >
                remove
              </button>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default Stories
