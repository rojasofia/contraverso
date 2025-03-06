import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";
import { talleresRequest, talleresFail, fillTalleres, editTaller } from "./talleresSlice";
import { db } from "../../Firebase/firebaseConfig";
import fileUpload from "../../services/clouCarrTalleres/fileUpload";
import Swal from "sweetalert2";


const COLLECTION_NAME = "aprendeTalleres";
const collectionRef = collection(db, COLLECTION_NAME);

export const actionGetTalleres = () => {
    return async (dispatch) => {
        dispatch(talleresRequest());
        const talleres = [];
        try {
            const querySnapshot = await getDocs(collectionRef);
            querySnapshot.forEach((doc) => {
                talleres.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            console.log("Talleres obtenidos:", talleres);
dispatch(fillTalleres(talleres));
        } catch (error) {
            console.error(error);
            dispatch(talleresFail(error.message));
        }
    }
}

export const actionAddTaller= ({ file, title}) => {
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

  export const actionDeleteTaller = (idTaller) => {
    return async (dispatch) => {
      if (!idTaller) {
        console.error("ID del documento no especificado.");
        return;
      }
  
      try {
        // Lógica para eliminar el documento de Firestore
        // Por ejemplo:
        const docRef = doc(db, COLLECTION_NAME, idTaller);
        await deleteDoc(docRef);
        Swal.fire({
          title: "Bien hecho",
          text: "Taller eliminado correctamente de la base de datos",
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

  export const actionEditTaller = (idTaller, editedTaller) => {
    return async (dispatch) => {
      dispatch(talleresRequest());
      try {
        // Subir la imagen a Cloudinary
        if (editedTaller?.file) {
          const imageUrl = await fileUpload(editedTaller.file);
  
          if (!imageUrl) {
            throw new Error("Error al subir la imagen a Cloudinary");
          }
  
          editedTaller.poster = imageUrl;
          delete editedTaller.file;
        }
        const imgRef = doc(db, COLLECTION_NAME, idTaller);
  
        await updateDoc(imgRef, {...editedTaller});
        dispatch(
          editTaller({
            id: idTaller,
            ...editedTaller,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(talleresFail(error.message));
      }
    };
  };