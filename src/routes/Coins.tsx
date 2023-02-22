import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { coinFetchData } from "../api";
import LoadingSpinner from "../common/Loading";
import { CoinInformation } from "../interfaceModule";

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: transparent;
  border: 1px solid
    ${(props) => (props.theme.textColor === "white" ? "white" : "black")};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  img {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.linkColor};
    }
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 30px;
`;

function Coins() {
  const { isLoading, data: coins } = useQuery<CoinInformation[]>(
    "allCoinData",
    coinFetchData
  );
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button>Mode Button</button>
      </Header>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <CoinsList>
          {coins &&
            coins.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                  }}
                >
                  <img
                    alt="coin"
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
