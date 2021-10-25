import { useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { PUBLISH } from "../../../gql/publications";
import "./ModalUpload.css";

const ModalUpload = (props) => {
	const { show, setShow } = props;
	const [fileUpload, setFileUpload] = useState(null);
	const [loading, setLoading] = useState(false);
	const onDrop = useCallback((acceptedFile) => {
		const file = acceptedFile[0];
		setFileUpload({
			type: "image",
			file,
			preview: URL.createObjectURL(file),
		});
	});

	const [publish] = useMutation(PUBLISH);

	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/jpeg, image/png",
		noKeyboard: true,
		multiple: false,
		onDrop,
	});

	const onClose = () => {
		setLoading(false);
		setFileUpload(null);
		setShow(false);
		// Para recargar la página
		// window.location.reload();
	};

	const onPublish = async () => {
		try {
			setLoading(true);
			const result = await publish({
				variables: {
					file: fileUpload.file,
				},
			});
			const { data } = result;
			if (!data.publish.status) {
				toast.warning("Error en la Publciación");
				setLoading(false);
				onClose();
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Modal size="small" open={show} onClose={() => onClose()}>
			<div {...getRootProps()}>
				<Icon name="cloud upload" />
				<input {...getInputProps()}></input>
				<button onClick={() => onPublish()}>Publicar</button>
			</div>
			{loading && (
				<Dimmer>
					<Loader />
					<p>Publicando...</p>
				</Dimmer>
			)}
		</Modal>
	);
};

export default ModalUpload;
