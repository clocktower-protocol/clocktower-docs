import React from 'react';
//import clsx from 'clsx';
//import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import MainImage from '@site/static/img/interior_rotated2.jpg';
import Translate, {translate} from '@docusaurus/Translate';


import styles from './index.module.css';

function HomepageHeader() {
  //const {siteConfig} = useDocusaurusContext();
  return (
    <div className={styles.imageContainer}>
      <img src={MainImage} alt={
            translate({
              message: 'Main Image',
              description: 'The homepage main image alt message',
            })
      }></img>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={
        translate({
          message: 'Decentralized Subscriptions',
          description: 'Layout Description',
        })
  }>
      <HomepageHeader />
      <main>
       
      </main>
    </Layout>
  );
}
