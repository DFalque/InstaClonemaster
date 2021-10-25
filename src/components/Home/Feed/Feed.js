import "./Feed.scss"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { Image } from "semantic-ui-react"
import { GET_PUBLICATION_FOLLOWEDS } from "../../../gql/publications"
import avatar from "../../../img/avatar.png"
import ModalPublication from "../../Modal/ModalPublication"
import { useEffect, useState } from "react"

const Feed = () => {
	const [showModal, setShowModal] = useState(false)
	const [publicationSelected, setPublicationSelected] = useState(null)
	const { data, loading, startPolling, stopPolling } = useQuery(
		GET_PUBLICATION_FOLLOWEDS
	)

	useEffect(() => {
		startPolling(2000)
		return () => {
			stopPolling()
		}
	}, [startPolling, stopPolling])

	if (loading) return null
	console.log(data)
	const { getPublicationFolloweds } = data

	const openPublication = (publication) => {
		setPublicationSelected(publication)
		setShowModal(true)
	}

	return (
		<>
			<div className="Feed">
				<h2>Feeed</h2>
				{getPublicationFolloweds.map((publication, index) => {
					return (
						<div className="Feed__box" key={index}>
							<Link to={`/${publication.idUser.username}`}>
								<div key={index} className="feed_box-user">
									<Image src={publication.idUser.avatar || avatar} avatar />
									<span> {publication.idUser.name}</span>
								</div>
							</Link>
							<div
								className="Feed__box-photo"
								style={{ backgroundImage: `url("${publication.file}")` }}
								onClick={() => openPublication(publication)}
							></div>
						</div>
					)
				})}
			</div>
			{showModal ? (
				<ModalPublication
					show={showModal}
					setShow={setShowModal}
					publication={setPublicationSelected}
				/>
			) : null}
		</>
	)
}

export default Feed
