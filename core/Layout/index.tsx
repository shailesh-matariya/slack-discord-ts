import { Box } from '@mui/material';
import Head from 'next/head';
import Header from '../components/Header';

import { TProps } from '../utils/AppTypes';

const AppLayout = ({ children }: TProps) => {
  return <>
    <Head>
      <title>Slack - Discord</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
    </Head>
    <Header />
    <Box className="container">
      {children}
    </Box>
  </>
}

export default AppLayout;
