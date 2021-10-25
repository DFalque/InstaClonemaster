import PreviewPublication from "./PreviewPublication/PreviewPublication"
import "./Publications.scss"

const Publications = (props) => {
	const { getPublications } = props
	return (
		<div className="Publications">
			<div className="Publications__line"> </div>
			<h1>Publicaciones</h1>
			<div className="Publications__imgContainer">
				{getPublications.map((publication, index) => {
					return <PreviewPublication key={index} publication={publication} />
				})}
			</div>
		</div>
	)
}

export default Publications
