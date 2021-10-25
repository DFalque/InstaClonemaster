import { Image, Modal } from "semantic-ui-react"
import Actions from "./Actions/Actions"
import CommentForm from "./CommentForm/CommentForm"
import Comments from "./Comments"

const ModalPublication = (props) => {
	const { show, onClose, publication } = props
	return (
		<Modal
			open={show}
			onClose={() => onClose(false)}
			className="modal-publication"
		>
			<h2>Publicación</h2>
			<h3>Imagen</h3>
			<Image />
			<div>
				<Comments publication={publication} />
			</div>
			<Actions publication={publication} />
			<div>
				<CommentForm publication={publication} />
			</div>
		</Modal>
	)
}

export default ModalPublication
