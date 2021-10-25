import { helmet } from "react-helmet";

export default function Helmet() {
  if (isLoading)
    return (
      <Helmet>
        <title>Cargando...</title>
      </Helmet>
    );

  const title = "Titulo de la página";
  description = "Esto es la descripción";

  return (
    <>
      <Helmet>
        <title>{tittle}</title>
        <meta name="description" content={description}></meta>
      </Helmet>
      <main></main>
    </>
  );
}
