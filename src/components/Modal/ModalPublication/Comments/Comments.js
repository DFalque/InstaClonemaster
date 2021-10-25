import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { GET_COMMENTS } from "../../../../gql/comment"

const Comments = (props) => {
	const { publication } = props

	const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
		variables: {
			idPublication: publication.id,
		},
	})

	useEffect(() => {
		startPolling(1000)
		return () => stopPolling()
	}, [startPolling, stopPolling])

	if (loading) return null
	const { getComments } = data
	return (
		<div>
			{getComments.map((comment) => (
				<p>{comment.comment}</p>
			))}
		</div>
	)
}

export default Comments
