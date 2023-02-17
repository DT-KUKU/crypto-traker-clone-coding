import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Title, Container, Header } from "./Coins";
import { Helmet } from "react-helmet";
import {
  ParamType,
  UseLocationStateType,
  InfoData,
  PriceData,
} from "../interfaceModule";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { coinInfoFetchData, priceInfoFetchData } from "../api";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import LoadingSpinner from "../common/Loading";

const OverViewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.basicColor};
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

const CoinHeader = styled(Header)`
  position: relative;
  a {
    position: absolute;
    left: 0px;
    top: 35%;
  }
`;

const Description = styled.p`
  margin: 10px 0px;
  color: ${(props) => props.theme.basicColor};
  font-weight: 300;
  line-height: 1.2;
`;

const Tabs = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
  height: 30px;
  gap: 12px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  padding: 6px 0px;
  text-align: center;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.linkColor : props.theme.basicColor};
  a {
    display: block;
  }
`;

function Coin() {
  const { coinId } = useParams<ParamType>();
  const { state } = useLocation<UseLocationStateType>();
  const { isLoading: infoLoading, data: info } = useQuery<InfoData>(
    ["info", coinId],
    () => coinInfoFetchData(coinId)
  );
  const { isLoading: priceLoading, data: price } = useQuery<PriceData>(
    ["price", coinId],
    () => priceInfoFetchData(coinId),
    { refetchInterval: 5000 }
  );
  const loading = infoLoading || priceLoading;
  const usePriceMatch = useRouteMatch("/:coinId/price");
  const useChartMatch = useRouteMatch("/:coinId/chart");
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </title>
      </Helmet>
      <CoinHeader>
        <Link to="/">
          <ArrowCircleLeftIcon fontSize="large" />
        </Link>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </CoinHeader>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <OverViewContainer>
            <OverviewItem>
              <span>Rank</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>${price?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </OverViewContainer>
          <Description>{info?.description}</Description>
          <OverViewContainer>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </OverViewContainer>
          <Tabs>
            <Tab isActive={useChartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={usePriceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
            <Route path={`/:coinId/price`}>
              {price && <Price price={price} />}
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
