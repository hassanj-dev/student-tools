import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, url }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Optional but recommended */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}