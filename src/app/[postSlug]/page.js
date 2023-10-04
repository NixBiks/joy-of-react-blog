import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';
import CodeSnippet from '@/components/CodeSnippet';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import { notFound } from 'next/navigation';
const DivisionGroupsDemo = React.lazy(() => import('@/components/DivisionGroupsDemo'));

export async function generateMetadata({ params: { postSlug } }) {
  try {
    const { frontmatter: { title, abstract } } = await loadBlogPost(postSlug);
    return {
      title: title + ' • ' + BLOG_TITLE,
      description: abstract,
    }
  } catch (e) {

  }
}

async function BlogPost({ params: { postSlug } }) {
  try {
    const { frontmatter: { title, publishedOn }, content } = await loadBlogPost(postSlug);
    return (
      <article className={styles.wrapper}>
        <BlogHero
          title={title}
          publishedOn={publishedOn}
        />
        <div className={styles.page}>
          <MDXRemote source={content} components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }} />

        </div>
      </article>
    );
  } catch (e) {
    notFound();
  }
}

export default BlogPost;
