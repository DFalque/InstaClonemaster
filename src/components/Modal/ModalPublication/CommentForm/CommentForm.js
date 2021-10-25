import { useMutation } from "@apollo/client"
import { useState } from "react"
import { Button, Form } from "semantic-ui-react"
import { ADD_COMMENT } from "../../../../gql/comment"

function CommentForm(props) {
	const { publication } = props
	const [form, setForm] = useState("")
	const [addComment] = useMutation(ADD_COMMENT)

	const onSubmit = async () => {
		try {
			await addComment({
				variables: {
					input: {
						idPublication: publication.id,
						comment: form,
					},
				},
			})
			console.log("termina la función")
			setForm("")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<Form onSubmit={() => onSubmit()}>
				<Form.Input
					placeholder="Añade Comentario"
					name="comment"
					value={form}
					onChange={(e) => setForm(e.target.value)}
				/>
				<Button>Añadir Comentario</Button>
			</Form>
		</div>
	)
}

export default CommentForm
