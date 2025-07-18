import React from 'react';
//import clsx from 'clsx';
//import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import MainImage from '@site/static/img/interior_rotated2.jpg';
import Translate, {translate} from '@docusaurus/Translate';
//import TowerImage from '@site/static/img/towerside.jpeg';
import WiresImage from '@site/static/img/wires3.jpeg'
import ChurchImage from '@site/static/img/church2.jpg'


import styles from './index.module.css';

function HomepageHeader() {
  //const {siteConfig} = useDocusaurusContext();
  return (
    <div>
      <div style={{paddingTop: "20px"}}>
        <h1 className={styles.heroBanner}>Subscriptions for Everyone</h1>
      </div>
      <div className={styles.imageContainer}>
        <img src={MainImage} className={styles.imageFitter} alt={
              translate({
                message: 'Main Image',
                description: 'The homepage main image alt message',
              })
        }></img>
      </div>
      <div className={styles.doubleBoxGridContainer}>
        <div className={styles.doubleBoxText}>
          <h1 className={styles.banner2}>Decentralized <p></p>Recurring <p></p> Crypto Payments</h1>
        </div>
        <div className={styles.doubleBoxImage}>
          <img className={styles.imageFitter} src={ChurchImage} alt="towerimage"></img>
        </div>
      </div>
      <div className={styles.doubleBoxGridContainer}>
        <div className={styles.doubleBoxImage}>
            <img className={styles.imageFitter} src={WiresImage} alt="wiresimage"></img>
        </div>
        <div className={styles.doubleBoxText}>
            <h1 className={styles.banner3}>It's Time</h1>
        </div>
      </div>
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
