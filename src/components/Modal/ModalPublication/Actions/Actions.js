import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { Icon } from "semantic-ui-react"
import {
	ADD_LIKE,
	COUNT_LIKES,
	DELETE_LIKE,
	IS_LIKE,
} from "../../../../gql/like"
import "./Actions.scss"

const Actions = (props) => {
	const { publication } = props
	const [loading, setLoading] = useState(false)
	const [addLike] = useMutation(ADD_LIKE)
	const {
		data,
		loading: loadingIsLike,
		refetch,
	} = useQuery(IS_LIKE, {
		variables: {
			idPublication: publication.id,
		},
	})

	const {
		data: dataCount,
		loading: loadingCount,
		refetch: refetchCount,
	} = useQuery(COUNT_LIKES, {
		variables: {
			idPublication: publication.id,
		},
	})

	const [deleteLike] = useMutation(DELETE_LIKE)

	const onAddLike = async () => {
		setLoading(true)
		try {
			await addLike({
				variables: {
					idPublication: publication.id,
				},
			})
			refetch()
			refetchCount()
		} catch (error) {
			console.log(error)
		}
		setLoading(false)
	}

	const onDeleteLike = async () => {
		setLoading(true)
		try {
			await deleteLike({
				variables: {
					idPublication: publication.id,
				},
			})
			refetch()
			refetchCount()
		} catch (error) {
			console.log(error)
		}
		setLoading(false)
	}

	const onAction = () => {
		if (!loading) {
			if (isLike) {
				onDeleteLike()
			} else {
				onAddLike()
			}
		}
	}

	if (loadingIsLike || loadingCount) return null
	const { isLike } = data
	const { countLikes } = dataCount
	console.log(countLikes)

	return (
		<div className="Action">
			<Icon
				className={isLike ? "like active" : "like"}
				name={isLike ? "heart" : "heart outline"}
				onClick={() => onAction()}
			/>
			<p>
				{countLikes ? countLikes : 0} {countLikes === 1 ? "Like" : "Likes"}
			</p>
		</div>
	)
}

export default Actions
