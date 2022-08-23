import AppLayout from '../core/Layout'
import '../styles/globals.css';

const Page = ({ Component, pageProps }: any) => {
  
  return <>
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  </>
}

export default Page
