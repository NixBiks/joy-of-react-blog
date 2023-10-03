import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';
import CodeSnippet from '@/components/CodeSnippet';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';

export async function generateMetadata({ params: { postSlug } }) {
  const { frontmatter: { title, abstract } } = await loadBlogPost(postSlug);
  return {
    title: title + ' • ' + BLOG_TITLE,
    description: abstract,
  }
}

async function BlogPost({ params: { postSlug } }) {
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
        }} />
      </div>
    </article>
  );
}

export default BlogPost;
