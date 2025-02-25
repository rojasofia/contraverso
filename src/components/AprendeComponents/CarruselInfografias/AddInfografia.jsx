import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { actionAddInfo } from "../../../app/infografias/infografiasActions";

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
    max-width: 35.25rem;
    background-color: #161616;
    position: relative;
    border-radius: 6px;
    border-color: transparent;
    outline: none;
    height: auto;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;

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
      background-color: #1df4c8;
      width: 100%;
      height: 80%;
      margin-top: 20px;
      margin-bottom: 20px;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #4900da;
        font-family: "MADE Soulmaze Brush";
        font-size: 4.5vw;
        margin-top: 10px;
      }
      p {
        text-align: center;
        font-family: "MADE Soulmaze";
        font-size: 1.5vw;
        font-weight: bold;
        color: #161616;
      }

      form {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;

        .containInfo {
          display: flex;
          margin: 30px;

          .info {
            display: flex;
            flex-direction: column;

            label {
              font-family: "Founders Grotesk";
              color: #514d5b;
              text-align: justify;
              font-weight: bold;
            }

            .infoImg {
              font-family: "Filson Pro Book";
              border-radius: 1rem;
              font-size: 90%;
              width: 80%;
              margin-bottom: 20px;
              border: none;
              outline: none;
              padding: 5px;
            }

            .selecImg {
              border: none;
              font-family: "Filson Pro Book";
              position: relative;
              display: inline-block;
            }
            .selecImg::before {
              background-color: #d977c8;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 1rem;
              content: "Seleccionar"; /* testo por defecto */
              position: absolute;
              padding: 5px;
              width: 75%;
            }

            .selecImg input[type="file"] {
              opacity: 0;
              width: 200px;
              height: 32px;
              display: inline-block;
            }

            #src-selecImg1::before {
              content: "Seleccionar Archivo 1";
            }

            #src-selecImg2::before {
              content: "Seleccionar Archivo 2";
            }
          }
        }

        span {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px;

          button {
            display: flex;
            background-color: #fff35f;
            padding: 1rem;
            color: #ffffff;
            border: none;
            border-radius: 1.25rem;
            color: #161616;
            font-family: "MADE Soulmaze";
            font-size: 0.75rem;
          }
        }
      }
    }
  }
`;

export const AddInfografia = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // Actualizar la previsualización de la imagen
    updateImagePreview(event.target.files[0]);
  };


  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile  && title) {      
      try {
        await dispatch(actionAddInfo({ file: selectedFile, title }));
        setSelectedFile(null);
        setTitle("");
        document.getElementById("preview").src = "";
        Swal.fire({
          icon: "success",
          title: "¡Has subido un a infografía correctamente!",
          showConfirmButton: false,
          timer: 2500,
        }).finally(() => {
          location.reload();
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateImagePreview = (file) => {
    if (file) {
      document.getElementById("preview").src = URL.createObjectURL(file);
    } else {
      document.getElementById("preview").src = "";
    }
  };

  return (
    <SyledModal>
      <div className="containerModal">
        <button className="buttonClose" onClick={onClose}>
          X
        </button>
        <div className="contenidoModal">
          <h1>INFOGRAFIAS</h1>
          <p>¡LISTO PARA PUBLICAR!</p>
          <form onSubmit={onFormSubmit}>
            <div className="containInfo">
              <div className="info">
                <label htmlFor="title">Título:</label>
                <input
                  className="infoImg"
                  type="text"
                  id="title"
                  value={title}
                  onChange={onTitleChange}
                  required
                />
                <label htmlFor="file">Seleccionar imagen:</label>
                <div className="selecImg"><input type="file" id="file" onChange={onFileChange} required /></div>
              </div>
              <div className="imagePrev">
                <img id="preview" style={{ width: "200px", height: "auto" }} />
              </div>
            </div>

            <span>
              <button type="submit">SUBIR IMAGEN</button>
            </span>
          </form>
        </div>
      </div>
    </SyledModal>
  );
};
