import React from 'react'
import MovieThumbnail from './MovieThumbnail'

const MoviesCollection = ({ results, title }) => {
  return (
    <div
      className="relative  mx-auto flex max-w-[1400px]
    flex-col space-y-2 px-8 pt-10"
    >
      <h2 className="text-lg font-semibold uppercase">{title}</h2>
      <div
        className="-m-2 flex space-x-6 overflow-y-hidden
        overflow-x-scroll p-2 scrollbar-hide"
      >
        {results.map((result) => (
          <MovieThumbnail key={result.id} result={result} />
        ))}
      </div>
    </div>
  )
}

export default MoviesCollection
