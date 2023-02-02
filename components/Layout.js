import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Acosta Apparel</title>
        <meta name="description" content="Ecommerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <Navbar />
        <main className="m-auto mt-4 px-4 container">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
