import styled from "styled-components";
import { PriceData } from "../interfaceModule";

const PriceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const PriceBox = styled.div`
  border: 1px solid teal;
  background-color: white;
  border-radius: 7px;
`;

interface IPricePropsType {
  price: PriceData;
}

function Price({ price }: IPricePropsType) {
  return (
    <PriceContainer>
      <PriceBox>
        <h1>{price.id} 1h</h1>
      </PriceBox>
      <PriceBox>
        <h1>{price.id} 1h</h1>
      </PriceBox>
      <PriceBox>
        <h1>{price.id} 1h</h1>
      </PriceBox>
      <PriceBox>
        <h1>{price.id} 1h</h1>
      </PriceBox>
      <PriceBox>
        <h1>{price.id} 1h</h1>
      </PriceBox>
      <PriceBox>
        <h1>{price.id} 1h</h1>
      </PriceBox>
    </PriceContainer>
  );
}

export default Price;
