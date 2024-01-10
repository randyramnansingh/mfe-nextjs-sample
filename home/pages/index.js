import React, { Fragment, Suspense, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {lazy} from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

let useCustomHook
let RemoteTitle = ()=>null
if (process.browser) {
  //useCustomHook = require('shop/customHook').default;
   RemoteTitle = lazy(
    () => {
      return import('checkout/title');
    }
  );
}
console.log('test')

const federatedSignOut = () => {
  // signOut only signs out of Auth.js's session
		// We need to log out of Cognito as well
		// Federated signout is currently not supported.
		// Therefore, we use a workaround: https://github.com/nextauthjs/next-auth/issues/836#issuecomment-1007630849
    signOut({redirect: false});
		const signoutRedirectUrl = 'http://localhost:3000';
		// https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html
    const COGNITO_ISSUER = "https://gem-test-1.auth.us-east-1.amazoncognito.com";
    const COGNITO_CLIENT_ID = "5qnp4cdf0cakvb8gnnbdprppki";
		window.location.replace(
			`${COGNITO_ISSUER}/logout?client_id=${COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(
				signoutRedirectUrl
			)}`
		);
}

const Home = ({ loaded }) => {
  if (process.browser) {
   // useCustomHook();
  }
  const [user, setUser] = useState({ id: 123, name: "randy" });

  const handleUserChange = (event) => {
    const { value } = event.target;
    setUser({ ...user, name: value });
  };

  const { data: session } = useSession()
  console.log(session);
  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero">
        <RemoteTitle user={user} />
        <h1 className="title">
          <code>home</code>
        </h1>
        <p className="description">Change the user in the parent app by using the dropdown/select element here, it will modify the values being passed from the Home microfrontend to the checkout microfrontend rendered above.</p>
        <select value={user.name} onChange={handleUserChange}>
          <option value="randy">Randy</option>
          <option value="john">John</option>
          <option value="jane">Jane</option>
        </select>
      </div>
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => federatedSignOut()}>Sign out</button>
      </>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  );
};
//
Home.getInitialProps = async ctx => {
  return {};
};

export default Home;
