import { useQuery } from "react-query";
import { fetchCoinTickers } from "./api";
import styled from "styled-components";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
interface IPrice {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CurrentPrice = styled.h2`
  margin-top: 40px;
  font-size: 80px;
  display: flex;
  justify-content: center;
`;

const AthPricePercent = styled.span<{ isActive: boolean }>`
  margin-top: 40px;
  font-size: 40px;
  color: ${(props) => (props.isActive ? "#F08080" : "#ADD8E6")};
`;

const Para = styled.p`
  margin-top: 40px;
  font-size: 30px;
  color: ${(props) => props.theme.textColor};
`;

function Price({ coinId }: IPrice) {
  const { isLoading, data } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  let isActive =
    data === undefined ? true : data.quotes.USD.percent_change_24h > 0;

  return (
    <>
      {isLoading ? (
        "Loading Chart ..."
      ) : (
        <>
          <PriceContainer>
            <Para>Compare to yesterday ...</Para>
            <AthPricePercent isActive={isActive}>
              {data === undefined
                ? null
                : Math.abs(data?.quotes.USD.percent_change_24h)}
              %
              {isActive ? (
                <ArrowUpward style={{ fontSize: 30 }}></ArrowUpward>
              ) : (
                <ArrowDownward style={{ fontSize: 30 }}></ArrowDownward>
              )}
            </AthPricePercent>
          </PriceContainer>

          <CurrentPrice>${data?.quotes.USD.price.toFixed(2)}</CurrentPrice>
        </>
      )}
    </>
  );
}

export default Price;
