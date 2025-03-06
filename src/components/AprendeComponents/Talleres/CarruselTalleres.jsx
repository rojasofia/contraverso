import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionDeleteTaller,
  actionGetTalleres,
} from "../../../app/talleres/talleresActions";
import Slider from "react-slick";
import styled from "styled-components";
import { MdAddToPhotos } from "react-icons/md";
import { AddTaller } from "./AddTaller";
import { FaEdit } from "react-icons/fa";
import { EditTaller } from "./EditTaller";
import { AiFillDelete } from "react-icons/ai";

const CarouselContainer = styled.div`
  max-width: 55%;
  margin-bottom: 5%;
  position: relative;
  z-index: 3;
  padding-top: 5%;
  @media (max-width: 975px) {
    padding-top: 10%;
  }
`;

const CustomSlider = styled(Slider)`
  .slick-slide {
    padding: 0 10px;
    @media (max-width: 800px) {
      padding: 0;
    }
  }

  .slick-slide img {
    height: auto;
    border-radius: 5%;
    max-width: 100%;
  }

  .slick-slide-content {
    position: relative;
    overflow: hidden;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .slick-slide-content img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-bottom: 5%;
  }

  .slick-prev {
    left: -45px;
  }

  .slick-prev:before,
  .slick-next:before {
    display: inline-block;
    font-size: 40px;
    border-radius: 55%;
    transition: transform 0.3s ease;
    color: #d977c8;
    @media (max-width: 800px) {
      font-size: 20px;
    }
  }

  .slick-prev:hover:before,
  .slick-next:hover:before {
    color: #d977c8;
    transform: rotate(-180deg);
    font-size: 45px;
    @media (max-width: 800px) {
      font-size: 25px;
    }
  }

  .actionButtons {
    display: flex;
    margin-top: 20px;
    color: #d977c8;
    font-size: 25px;
    gap: 10px;
  }
`;

const StyledDescription = styled.h1`
  font-family: "Filson Pro Book";
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  background-color: #d977c942;
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;
  border-radius: 5%;
  padding: 3%;
  width: 100%;
  font-size: 15px;
  line-height: 1.5;
`;

const StyledButton = styled.button`
  cursor: pointer;
  background-color: #fff35f;
  color: #000000;
  padding: 0.5rem;
  font-family: "MADE Soulmaze";
  border: none;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  width: 80%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const StyledButtonAdd = styled.button`
  cursor: pointer;
  background-color: #fff35f;
  color: #000000;
  padding: 0.5rem;
  font-family: "MADE Soulmaze";
  border: none;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  position: absolute;
  right: 0;
  z-index: 3;
  width: 30%;
  @media (max-width: 600px) {
    width: 100%;
    font-size: 3vw;
    align-self: center;
  }
  @media (min-width: 601px) and (max-width: 800px) {
    width: 60%;
  }
  @media (min-width: 801px) and (max-width: 900px) {
    width: 40%;
  }
`;

const CarruselTalleres = () => {
  const dispatch = useDispatch();
  const talleres = useSelector((store) => store.talleres.talleres);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { isAuthenticated } = useSelector((store) => store.userAuth);
  const [selectedTaller, setSelectedTaller] = useState(null);

  useEffect(() => {
    console.log("Obteniendo Talleres...");
    dispatch(actionGetTalleres());
  }, [dispatch]);

  useEffect(() => {
    console.log("Datos de Talleres:", talleres);
  }, [talleres]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    focusOnSelect: false,
    autoplaySpeed: 2000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleImageClick = (taller) => {
    setSelectedTaller(taller);
  };

  const handleUrlClick = (url) => {
    window.open(url, "_blank");
  };

  const handleCloseModal = () => {
    setSelectedTaller(null);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModalEdit = (taller) => {
    setShowModalEdit(true);
    setSelectedTaller({ ...taller, id: taller.id });
  };

  const closeModalEdit = () => {
    setShowModalEdit(false);
    setSelectedTaller(null);
  };

  function handleDeleteClick(id) {
    dispatch(actionDeleteTaller(id));
  }

  return (
    <CarouselContainer>
      {isAuthenticated ? (
        <>
          <div>
            <StyledButtonAdd onClick={openModal}>
              <MdAddToPhotos className="iconAdd" />
              AÑADIR TALLER
            </StyledButtonAdd>
            <div className="modalImg">
              {showModal && <AddTaller onClose={closeModal} />}
            </div>
            <div className="modalImg">
              {showModalEdit && (
                <EditTaller
                  onClose={closeModalEdit}
                  initialData={selectedTaller}
                />
              )}
            </div>
          </div>
        </>
      ) : null}
      <CustomSlider {...settings}>
        {talleres.map((taller, index) => (
          <div key={index}>
            <div className="slick-slide-content">
              <img
                src={taller.poster}
                alt={`Poster ${index + 1}`}
                onClick={() => handleImageClick(taller)}
              />
              <StyledDescription>{taller.title}</StyledDescription>
              <StyledButton onClick={() => handleUrlClick(taller.url)}>
                SABER MÁS
              </StyledButton>
              {isAuthenticated ? (
                <>
                  <div className="actionButtons">
                    <AiFillDelete
                      alt="eliminar"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que el clic en el botón active el modal de previsualización
                        handleDeleteClick(taller.id);
                      }}
                    />
                    <FaEdit
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que el clic en el botón active el modal de previsualización
                        openModalEdit(taller);
                      }}
                      alt="editar"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </CustomSlider>
      {/* Modal de Previsualización */}
      {selectedTaller && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 3,
          }}
          onClick={handleCloseModal}
        >
          <img
            src={selectedTaller.poster}
            alt={selectedTaller.title}
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      )}
    </CarouselContainer>
  );
};

export default CarruselTalleres;