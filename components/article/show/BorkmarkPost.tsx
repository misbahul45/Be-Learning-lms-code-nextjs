'use client';
import React from 'react';
import { Bookmark, BookmarkPlus, Loader2 } from 'lucide-react';
import { saveArticleAction } from '@/actions/article.action';
import clsx from 'clsx';

interface Props {
  userId: string;
  slug: string;
  isSaved: boolean;
  size?:'sm'|'lg'
}

const BookmarkPost = ({ userId, slug, isSaved, size='sm' }: Props) => {
  const handleSaveArticle = () => {
    return saveArticleAction(slug, userId);
  }

  const [, formAction, isPending] = React.useActionState(
    handleSaveArticle,
    isSaved
  );

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        aria-label={isSaved ? 'Remove bookmark' : 'Add bookmark'}
        className={clsx(
          'p-2 rounded-full shadow-md transition-all duration-200 disabled:opacity-85 disabled:cursor-not-allowed',
          isSaved
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-gray-100 hover:bg-gray-200'
        )}
      >
        {isPending ? (
          <Loader2 className={`${size==='sm'?'sm:size-5 size-3':'sm:size-7 size-5'} animate-spin text-gray-600`} />
        ) : (
          <>
            {isSaved ? (
              <Bookmark className={`${size==='sm'?'sm:size-5 size-3':'sm:size-7 size-5'} text-white`} />
            ) : (
              <BookmarkPlus className={`${size==='sm'?'sm:size-5 size-3':'sm:size-7 size-5'} text-indigo-600`} />
            )}
          </>
        )}
      </button>
    </form>
  );
};

export default BookmarkPost;