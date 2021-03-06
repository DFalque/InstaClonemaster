import { gql } from "@apollo/client"

export const PUBLISH = gql`
	mutation publish($file: Upload) {
		publish(file: $file) {
			status
			urlFile
		}
	}
`

export const GET_PUBLICATIONS = gql`
	query getPublications($username: String!) {
		getPublications(username: $username) {
			id
			idUser
			file
			typeFile
			createAt
		}
	}
`

export const GET_PUBLICATION_FOLLOWEDS = gql`
	query getPublicationFolloweds {
		getPublicationFolloweds {
			id
			idUser {
				username
				name
				email
				avatar
			}
			file
			typeFile
			createAt
		}
	}
`
