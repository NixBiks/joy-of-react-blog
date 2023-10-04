import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';

async function Home() {
  const blogPosts = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

      {blogPosts.map(p => (
        <BlogSummaryCard
        key={p.slug}
          slug={p.slug}
          title={p.title}
          abstract={p.abstract}
          publishedOn={p.publishedOn}
        />
      ))}
    </div>
  );
}

export default Home;
