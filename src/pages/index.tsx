import  Head  from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

import { GetServerSideProps, GetStaticProps } from 'next';
import { stripe } from '../services/stripe';

interface Homeprops {
  product: {
    priceId: string;
    amount: number;
  }
}
export default function Home({product}: Homeprops) {
  return (
    <>
    <Head>
      <title>Home ig news</title>
    </Head>
    <main className={styles.contenteContainer} >

      <section className={styles.hero} >
        <span>👏Hey, welcome</span>
        <h1>News about the <span>React</span> World </h1>
        <p>
          Get Access to all the the publications<br/>
          <span>for {product.amount} </span>
        </p>
        <SubscribeButton priceId={product.priceId}/>
      </section>

      <img src="/images/avatar.svg" alt="Girl coding" />
      
    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KL7mhBpxYOwYhjQ0mxpJ7RA')
  // const price = await stripe.prices.retrieve('price_1KL7mhBpxYOwYhjQ0mxpJ7RA',{expand: ['product']


  const product = {
    priceId: price.id,
    amount:new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency:'USD',

    }).format(price.unit_amount / 100),
  };
  return {
    props:{
      product,
    },
    revalidate: 60 * 60 * 24,
  }
}