import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, url }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* ✅ ADD HERE */}
      <meta
        name="keywords"
        content="notes app online, free notes tool, unit converter, length converter, weight converter"
      />

      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}