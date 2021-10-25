import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Publications from "../components/auth/Publications/Publications";
import Profile from "../components/User/Profile";
import { GET_PUBLICATIONS } from "../gql/publications";

const User = () => {
	const { username } = useParams();
	const { data, loading, startPolling, stopPolling } = useQuery(
		GET_PUBLICATIONS,
		{
			variables: {
				username,
			},
		}
	);

	useEffect(() => {
		startPolling(1000);
		return () => {
			startPolling();
		};
	}, [startPolling, startPolling]);

	if (loading) return null;

	console.log("Esto no vaaaa");
	const { getPublications } = data;
	console.log(getPublications);
	return (
		<>
			<Profile username={username} totalPublications={getPublications.length} />
			<Publications getPublications={getPublications} />
		</>
	);
};

export default User;
