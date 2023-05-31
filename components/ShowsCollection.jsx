import React from 'react'
import ShowThumbnail from './ShowThumbnail'

const ShowsCollection = ({ results, title }) => {
  return (
    <div
      className="relative  mx-auto flex
    max-w-[1400px] flex-col space-y-2 px-8"
    >
      <h2 className="text-lg font-semibold uppercase">{title}</h2>
      <div
        className="-m-2 flex space-x-6 overflow-y-hidden
        overflow-x-scroll p-2 scrollbar-hide"
      >
        {results.map((result) => (
          <ShowThumbnail key={result.id} result={result} />
        ))}
      </div>
    </div>
  )
}

export default ShowsCollection
