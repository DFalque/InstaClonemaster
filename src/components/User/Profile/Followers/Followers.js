import { useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { GET_FOLLOWEDS, GET_FOLLOWERS } from "../../../../gql/follow"
import ModalBasic from "../../../Modal/ModalBasic"
import ListUsers from "../../ListUsers/ListUsers"

import "./Followers.scss"

const Followers = (props) => {
	const { username, totalPublications } = props
	const [showModal, setShowModal] = useState(false)
	const [titleModal, setTitleModal] = useState("")
	const [childrenModal, setChildrenModal] = useState(null)

	const {
		data: dataFollowers,
		loading: loadingFollowers,
		startPolling: startPollingFollowers,
		stopPolling: stopPollingFollowers,
	} = useQuery(GET_FOLLOWERS, {
		variables: {
			username,
		},
	})

	const {
		data: dataFolloweds,
		loading: loadingFolloweds,
		startPolling: startPollingFolloweds,
		stopPolling: stopPollingFolloweds,
	} = useQuery(GET_FOLLOWEDS, {
		variables: {
			username,
		},
	})

	useEffect(() => {
		startPollingFollowers(3000)
		return () => {
			stopPollingFollowers()
		}
	}, [startPollingFollowers, stopPollingFollowers])

	useEffect(() => {
		startPollingFolloweds(3000)
		return () => {
			stopPollingFolloweds()
		}
	}, [startPollingFolloweds, stopPollingFolloweds])

	if (loadingFollowers || loadingFolloweds) return null
	console.log(dataFolloweds)

	const { getFollowers } = dataFollowers
	const { getFolloweds } = dataFolloweds

	const openFollowers = () => {
		setTitleModal("Seguidores")
		setChildrenModal(
			<ListUsers users={getFollowers} setShowModal={setShowModal} />
		)
		setShowModal(true)
	}

	const openFolloweds = () => {
		setTitleModal("Seguidos")
		setChildrenModal(
			<ListUsers users={getFolloweds} setShowModal={setShowModal} />
		)
		setShowModal(true)
	}

	return (
		<>
			<div className="Followers">
				<span>{totalPublications}</span>
				<p onClick={() => openFollowers()}>Publicaciones</p>
				<span>{getFollowers.length}</span>
				<p onClick={() => openFollowers()}>Seguidores</p>
				<span>{getFolloweds.length}</span>
				<p onClick={() => openFolloweds()}>Seguidores</p>
			</div>
			<ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
				{childrenModal}
			</ModalBasic>
		</>
	)
}

export default Followers
