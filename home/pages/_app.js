import Nav from '../components/nav';
import App from 'next/app';
import dynamic from 'next/dynamic';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Nav />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
MyApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};

export default MyApp;
