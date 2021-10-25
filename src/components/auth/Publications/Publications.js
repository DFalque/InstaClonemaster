import PreviewPublication from "./PreviewPublication/PreviewPublication";

const Publications = (props) => {
	const { getPublications } = props;
	return (
		<div className="Publications">
			<h1>Publicaciones</h1>
			{getPublications.map((publication, index) => {
				return <PreviewPublication key={index} publication={publication} />;
			})}
		</div>
	);
};

export default Publications;
