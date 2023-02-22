import styled from "styled-components";
import { PriceData } from "../interfaceModule";

const PriceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const PriceBox = styled.div<{ isBoolean: boolean }>`
  border: 1px solid teal;
  background-color: white;
  border-radius: 7px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h1 {
    flex: 1;
    font-size: 25px;
  }
  > p {
    flex: 2;
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 35px;
    color: ${(props) => (props.isBoolean ? "red" : "blue")};
  }
`;

interface IPricePropsType {
  price: PriceData;
}

function Price({ price }: IPricePropsType) {
  console.log(typeof price.quotes.USD.percent_change_1h);
  return (
    <PriceContainer>
      <PriceBox isBoolean={price.quotes.USD.percent_change_1h > 0}>
        <h1>1h</h1>
        <p>{price.quotes.USD.percent_change_1h}</p>
      </PriceBox>
      <PriceBox isBoolean={price.quotes.USD.percent_change_6h > 0}>
        <h1>6h</h1>
        <p>{price.quotes.USD.percent_change_6h}</p>
      </PriceBox>
      <PriceBox isBoolean={price.quotes.USD.percent_change_12h > 0}>
        <h1>12h</h1>
        <p>{price.quotes.USD.percent_change_12h}</p>
      </PriceBox>
      <PriceBox isBoolean={price.quotes.USD.percent_change_24h > 0}>
        <h1>24h</h1>
        <p>{price.quotes.USD.percent_change_24h}</p>
      </PriceBox>
    </PriceContainer>
  );
}

export default Price;
