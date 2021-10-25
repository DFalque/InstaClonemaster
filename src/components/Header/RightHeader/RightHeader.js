import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";
import "./RightHeader.css";
import Img from "../../../img/avatar.png";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import ModalUpload from "../../Modal/ModalUpload";

const RightHeader = () => {
	const [showModal, setShowModal] = useState(false);
	const {
		auth: { username },
	} = useAuth();

	const { data, loading, error } = useQuery(GET_USER, {
		variables: { username },
	});

	if (loading || error) return null;
	const { getUser } = data;
	return (
		<>
			<Link to="/" style={{ textDecoration: "none", color: "black" }}>
				<Icon name="home" />
			</Link>
			<div
				style={{ textDecoration: "none", color: "black" }}
				onClick={() => setShowModal(true)}
			>
				<Icon name="plus" />
			</div>
			<Link
				to={`/${username}`}
				style={{ textDecoration: "none", color: "black" }}
			>
				<Image src={getUser.avatar ? getUser.avatar : Img} avatar />
			</Link>
			<ModalUpload show={showModal} setShow={setShowModal} />
		</>
	);
};

export default RightHeader;
