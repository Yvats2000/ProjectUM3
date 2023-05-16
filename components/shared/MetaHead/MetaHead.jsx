import Head from "next/head";
import { useRouter } from 'next/router';
export const MetaHead = ({metaData}) => {
  const router = useRouter()
  return (
    <Head>
      <meta charset="UTF-8" />
      <meta name="author" content="Urban Money" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, user-scalable=no;user-scalable=0;"/>
      <link rel="shortcut icon" type="image/x-icon" href={process.env.BASE_URL + '/favicon.ico'} />
      <link rel="preload" href={`${process.env.BASE_URL}/assets/images/personal-loanbanner.svg`} as="image" />
      {process.env.ENVIRONMENT !== 'PROD' ? <meta name ="robots" content="noindex, nofollow, noodp, noydir" /> : 
      (router.asPath.includes('/mutual-funds/search?')) ? <meta name ="robots" content="noindex, follow" /> :
      (router.asPath.includes('page=')) ? <meta name ="robots" content="index, follow" /> :
      (router.asPath.includes('/credit-card/standard-chartered/online-application-form')) ? <meta name ="robots" content="noindex, nofollow" /> :
      <meta name ="robots" content="index, follow, noodp, noydir" />}
      <title>{metaData.title || 'Urban Money'}</title>
      <meta name="description" content={metaData.description || 'Urban Money'} />
      <meta name="keywords" content={metaData.keywords || 'Urban Money'} />
      {(router.asPath.includes('page=')) ?
      <link rel="canonical" href={`${process.env.BASE_URL}${router.asPath}`} /> :
      <link rel="canonical" href={metaData.url || process.env.BASE_URL} />}
      {(router.asPath.includes('/mutual-funds/search?') || router.asPath.includes('page=')) ? <link rel="alternate" href={`${process.env.BASE_URL}${router.asPath}`} /> :
      <link rel="alternate" href={`${process.env.BASE_URL}${router.asPath}`} hrefLang="en"/>}
      <meta property="og:title" content={metaData.title || 'Urban Money'} />
      <meta property="og:url" content={metaData.url || process.env.BASE_URL} />
      <meta property="og:image" content={process.env.IMAGE_BASEURL + '/images/logoBlack.svg'} />
      <meta property="og:description" content={metaData.description || 'Urban Money'} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaData.title || 'Urban Money'} />
      <meta name="twitter:description" content={metaData.description || 'Urban Money' } />
      <meta name="twitter:image" content={process.env.IMAGE_BASEURL + '/images/logoBlack.svg'} />
      <meta name="og:type" content="website" />
      <meta property="og:site_name" content="Urban Money" />
    </Head>
  )
}
