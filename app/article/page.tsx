import ListArticle from '@/components/article/show/ListArticle'
import PostersArticle from '@/components/article/show/PostersArticle'
import ShowRecomTags from '@/components/article/show/ShowRecomTags'
import ArticleLoader from '@/components/Loaders/ArticleLoader'
import PosterLoader from '@/components/Loaders/PosterLoader'
import RecomTagsLoader from '@/components/Loaders/RecomTagsLoader'
import React, { Suspense } from 'react'

const page = async() => {
  return (
    <div className='w-full max-w-6xl mx-auto ms:px-0 px-2 py-2'>
      <Suspense fallback={<PosterLoader />}>
        <PostersArticle />
      </Suspense>
      <Suspense fallback={<RecomTagsLoader />}>
        <ShowRecomTags />
      </Suspense>
      <Suspense fallback={<ArticleLoader />}>
        <ListArticle />
      </Suspense>
    </div>
  )
}

export default page