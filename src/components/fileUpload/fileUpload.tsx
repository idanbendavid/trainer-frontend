import { Container } from '@mui/material';
import { useState } from 'react'
import mediaApiService from '../../services/mediaApiService';

function FileUpload() {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    };

    const uploadFile = async (event) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            await mediaApiService.uploadFilesToServer(formData);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Container >
            <input type="file" onChange={saveFile} />
            <button onClick={uploadFile}>Upload</button>
        </Container>
    )
}

export default FileUpload