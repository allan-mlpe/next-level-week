import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi'

import './styles.css';

interface Props {
    onSelectImage: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onSelectImage }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState<string>();

    const onDrop = useCallback(acceptedFiles => {
        // pegamos o primeiro arquivo, pois só temos um
        const selectedFile = acceptedFiles[0];

        // geramos uma URL para esse arquiv
        const fileUrl = URL.createObjectURL(selectedFile);

        setSelectedFileUrl(fileUrl);
        onSelectImage(selectedFile);
    }, [onSelectImage])
    
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*' // filtro apenas para images da lib
        })

    return (
        <div className="dropzone" {...getRootProps()}>

        { /* também aplicamos um filtro de imagem no input */}
        <input {...getInputProps()} accept="image/*" />
            
            {
                selectedFileUrl ?
                    <img src={selectedFileUrl} alt="Thumbnail do ponto de coleta" />
                : (
                    <p>
                        <FiUpload />
                        Imagem do estabelecimento
                    </p>
                )
            }
        </div>
    )
}

export default Dropzone;