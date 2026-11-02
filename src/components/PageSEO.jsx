import { Helmet } from 'react-helmet-async';
export default function PageSEO({ title, description = 'Nexo Store: tecnología y accesorios para tu día a día.' }) {
  return <Helmet>
    <title>{title ? `${title} | Nexo Store` : 'Nexo Store | Tecnología'}</title>
    <meta name="description" content={description} />
  </Helmet>;
}
