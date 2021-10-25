import { useState } from "react"
import { Image } from "semantic-ui-react"
import ModalPublication from "../../../Modal/ModalPublication"

const PreviewPublication = (props) => {
	const [showModal, setShowModal] = useState(false)
	const { publication } = props
	return (
		<>
			<Image src={publication.file} onClick={() => setShowModal(true)} />
			<ModalPublication
				show={showModal}
				onClose={setShowModal}
				publication={publication}
			/>
		</>
	)
}

export default PreviewPublication
