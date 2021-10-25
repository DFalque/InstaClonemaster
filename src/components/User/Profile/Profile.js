// LIBRARIES
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
// DATA
import { GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
// COMPONENTS
import ModalBasic from "../../Modal/ModalBasic";
import AvatarForm from "../AvatarForm";
import SettingsForm from "../SettingsForm/SettingsForm";
import Followers from "./Followers";
import HeaderProfile from "./HeaderProfile";

const Profile = (props) => {
	const { username, totalPublications } = props;
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTittleModal] = useState("");
	const [childrenModal, setChildrenModal] = useState(null);
	const { auth } = useAuth();
	const { data, loading, error } = useQuery(GET_USER, {
		variables: {
			username,
		},
	});

	if (loading) return null;
	if (error) return <h1>Usuario no registrado</h1>;

	const { getUser } = data;

	const handlerModal = (type) => {
		if (type === "avatar") {
			setTittleModal("Cambiar foto de perfil");
			setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />);
			setShowModal(true);
		} else if (type === "settings") {
			setTittleModal("Ajustes");
			setChildrenModal(<SettingsForm setShowModal={setShowModal} />);
			setShowModal(true);
		}
	};

	return (
		<div>
			<h1>{username}</h1>
			<HeaderProfile
				username={username}
				getUser={getUser}
				auth={auth}
				handlerModal={handlerModal}
			/>
			<Followers username={username} totalPublications={totalPublications} />
			<h1 onClick={() => username === auth.username && handlerModal("avatar")}>
				Image
			</h1>
			<img src={getUser.avatar ? getUser.avatar : null} />
			<ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
				{childrenModal}
			</ModalBasic>
		</div>
	);
};

export default Profile;
