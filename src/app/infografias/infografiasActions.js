import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";
import { infografiasRequest, infografiasFail, fillInfografias, editInfo } from "./infografiasSlice";
import { db } from "../../Firebase/firebaseConfig";
import fileUpload from "../../services/clouCarrInfos/fileUpload";
import Swal from "sweetalert2";


const COLLECTION_NAME = "aprendeInfografias";
const collectionRef = collection(db, COLLECTION_NAME);

export const actionGetInfografias = () => {
    return async (dispatch) => {
        dispatch(infografiasRequest());
        const infografias = [];
        try {
            const querySnapshot = await getDocs(collectionRef);
            querySnapshot.forEach((doc) => {
                infografias.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            console.log("Infografías obtenidas:", infografias);
dispatch(fillInfografias(infografias));
        } catch (error) {
            console.error(error);
            dispatch(infografiasFail(error.message));
        }
    }
}

export const actionAddInfo= ({ file, title}) => {
    return async (dispatch) => {
      if (!file || !title.trim()){
        console.error("Datos del formulario inválidos.");
        return;
      }
      try {
        // Subir la imagen a Cloudinary
        const imageUrl = await fileUpload(file);
  
        // Guardar los metadatos en Firestore
        const docRef = await addDoc(collectionRef, {
          poster: imageUrl,
          title: title,
        });
        console.log("Documento escrito con ID: ", docRef.id);
      } catch (error) {
        console.error("Error al agregar la imagen: ", error);
      }
    };
  };

  export const actionDeleteInfo = (idInfo) => {
    return async (dispatch) => {
      if (!idInfo) {
        console.error("ID del documento no especificado.");
        return;
      }
  
      try {
        // Lógica para eliminar el documento de Firestore
        // Por ejemplo:
        const docRef = doc(db, COLLECTION_NAME, idInfo);
        await deleteDoc(docRef);
        Swal.fire({
          title: "Bien hecho",
          text: "Infografía eliminada correctamente de la base de datos",
          icon: "success",
          confirmButtonText: "OK",
          // Función a ejecutar cuando se confirma la alerta
          preConfirm: () => {
            location.reload(); // Recarga la página
          },
        });
        console.log("Documento eliminado correctamente de Firestore");
      } catch (error) {
        console.error("Error al eliminar el documento:", error);
      }
    };
  };

  export const actionEditInfo = (idInfo, editedInfo) => {
    return async (dispatch) => {
      dispatch(infografiasRequest());
      try {
        // Subir la imagen a Cloudinary
        if (editedInfo?.file) {
          const imageUrl = await fileUpload(editedInfo.file);
  
          if (!imageUrl) {
            throw new Error("Error al subir la imagen a Cloudinary");
          }
  
          editedInfo.poster = imageUrl;
          delete editedInfo.file;
        }
        const imgRef = doc(db, COLLECTION_NAME, idInfo);
  
        await updateDoc(imgRef, {...editedInfo});
        dispatch(
          editInfo({
            id: idInfo,
            ...editedInfo,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(infografiasFail(error.message));
      }
    };
  };