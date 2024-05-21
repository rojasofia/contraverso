import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionAddImg } from "../../../app/CarruselIMG/carruselActions";
import styled from 'styled-components';
import Swal from 'sweetalert2';


const SyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;

  .containerModal {
    width: 90%;
    max-width: 31.25rem;
    background-color: #161616;
    position: relative;
    border-radius: 6px;
    border-color: transparent;
    outline: none;
    height: auto;
    overflow: auto;
    display: flex;

    .buttonClose {
      font-family: Roboto;
      font-weight: 500;
      position: absolute;
      top: 13px;
      right: 13px;
      width: 25px;
      height: 25px;
      border-radius: 50px;
      border: none;
      color: #161616; /* neutral-600 */
      background: #fff35f;
      cursor: pointer;
    }

    .contenidoModal {
      display: flex;

      .buttonLogout {
        display: flex;
        background-color: transparent;
        padding: 1rem;
        color: #ffffff;
        font-family: "Filson Pro Book";
        font-size: 12px;
        border: 1px solid white;
        border-radius: 20px;
        margin-top: 5%;
        width: 10vw;
        justify-content: center;
      }
      .buttonLogout:hover {
        background-color: #1df4c8;
        color: #161616;
        border: none;
        cursor: pointer;
      }
    }
  }
`;

export const ImgForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [author, setAuthor] = useState('');
  const [name, setName] = useState('');

  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
    // Actualizar la previsualización de la imagen
    updateImagePreview(event.target.files[0]);
  };

  const onAuthorChange = event => {
    setAuthor(event.target.value);
  };

  const onNameChange = event => {
    setName(event.target.value);
  };

  const onFormSubmit = async event => {
    event.preventDefault();
    if (selectedFile && author && name) {
      try {
        await dispatch(actionAddImg({ file: selectedFile, author, name }));
        setSelectedFile(null); 
        setAuthor('');
        setName('');
        document.getElementById('preview').src = '';

        Swal.fire({
          icon: 'success',
          title: '¡Has subido una imagen correctamente!',
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
        });
      } catch (error) {
        console.error(error);
      }
    }
  };


  const updateImagePreview = (file) => {
    if (file) {
      document.getElementById('preview').src = URL.createObjectURL(file);
    } else {
      document.getElementById('preview').src = ''; 
    }
  };

  return (
    <SyledModal>
      <div className="containerModal">        
        <div className="contenidoModal">
          <button className='buttonClose' onClick={onClose}>X</button>
          <form onSubmit={onFormSubmit}>
            <label htmlFor="file">Seleccionar imagen:</label>
            <input type="file" id="file" onChange={onFileChange} required />
            
            <img id="preview" alt="Preview" style={{width: '200px', height: 'auto'}} />

            <label htmlFor="author">Autor:</label>
            <input type="text" id="author" value={author} onChange={onAuthorChange} required />

            <label htmlFor="name">Título:</label>
            <input type="text" id="name" value={name} onChange={onNameChange} required />

            <button type="submit">Subir imagen</button>
          </form>
        </div>
      </div>
    </SyledModal>
  );
};
