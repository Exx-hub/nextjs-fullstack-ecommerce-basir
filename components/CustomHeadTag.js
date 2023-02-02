import Head from "next/head";

function CustomHeadTag({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
}

export default CustomHeadTag;
