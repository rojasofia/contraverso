import styled from "styled-components";
import "../../../fonts/fonts.css";
import AprendeBienvenida from "../../components/AprendeComponents/AprendeBienvenida/AprendeBienvenida";
import AprendeJuega from "../../components/AprendeComponents/AprendeJuega/AprendeJuega";
import Infografias from "../../components/AprendeComponents/Infografias";
import Talleres from "../../components/AprendeComponents/Talleres";

const StyledAprende = styled.div`
  background-color: #000000;
  display: flex;
  flex-direction: column;
  gap: 5vh;
`;

const Aprende = () => {
  return (
      <StyledAprende>
          <AprendeBienvenida/>
          <AprendeJuega/>
          <Talleres/>
          <Infografias/>
      </StyledAprende>
  )
};

export default Aprende;