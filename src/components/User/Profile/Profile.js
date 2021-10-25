// LIBRARIES
import { useQuery } from "@apollo/client"
import React, { useState } from "react"
import { Image } from "semantic-ui-react"
// DATA
import { GET_USER } from "../../../gql/user"
import useAuth from "../../../hooks/useAuth"
// COMPONENTS
import ModalBasic from "../../Modal/ModalBasic"
import AvatarForm from "../AvatarForm"
import SettingsForm from "../SettingsForm/SettingsForm"
import Followers from "./Followers"
import HeaderProfile from "./HeaderProfile"
import "./Profile.scss"
import avatar from "../../../img/avatar.png"

const Profile = (props) => {
	const { username, totalPublications } = props
	const [showModal, setShowModal] = useState(false)
	const [titleModal, setTittleModal] = useState("")
	const [childrenModal, setChildrenModal] = useState(null)
	const { auth } = useAuth()
	const { data, loading, error } = useQuery(GET_USER, {
		variables: {
			username,
		},
	})

	if (loading) return null
	if (error) return <h1>Usuario no registrado</h1>

	const { getUser } = data

	const handlerModal = (type) => {
		if (type === "avatar") {
			setTittleModal("Cambiar foto de perfil")
			setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />)
			setShowModal(true)
		} else if (type === "settings") {
			setTittleModal("Ajustes")
			setChildrenModal(<SettingsForm setShowModal={setShowModal} />)
			setShowModal(true)
		}
	}

	return (
		<div className="Profile">
			<div className="Profile__container">
				<div className="Profile__imageContainer">
					<Image
						className="Profile__imageContainer__avatar"
						src={getUser.avatar || avatar}
						avatar
						onClick={() => username === auth.username && handlerModal("avatar")}
					/>
				</div>
				<div className="Profile__infoContainer">
					<HeaderProfile
						username={username}
						getUser={getUser}
						auth={auth}
						handlerModal={handlerModal}
					/>
					<Followers
						username={username}
						totalPublications={totalPublications}
					/>
				</div>
			</div>

			<ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
				{childrenModal}
			</ModalBasic>
		</div>
	)
}

export default Profile
