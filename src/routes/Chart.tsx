import { useQuery } from "react-query";
import { ohlcvInfoFetchData } from "../api";
import APEXChart from "react-apexcharts";
import LoadingSpinner from "../common/Loading";
import styled from "styled-components";

interface ChartPropsType {
  coinId: string;
}

interface ChartInfoType {
  time_open: number;
  time_close: number;
  market_cap: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

function Chart({ coinId }: ChartPropsType) {
  const { isLoading, data: chartInfo } = useQuery<ChartInfoType[]>(
    ["chart", coinId],
    () => ohlcvInfoFetchData(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* <APEXChart
            type="line"
            series={[
              {
                name: "Price",
                data: chartInfo?.map((el) => parseInt(el.close)) ?? [],
              },
            ]}
            options={{
              chart: {
                width: 500,
                height: 500,
                toolbar: {
                  show: false,
                },
                background: "transperent",
              },
              grid: {
                show: false,
              },
              xaxis: {
                axisTicks: { show: false },
                labels: {
                  show: false,
                },
                type: "datetime",
                categories:
                  chartInfo?.map((el) =>
                    new Date(el.time_close * 1000).toISOString()
                  ) ?? [],
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              tooltip: {
                y: {
                  formatter: (val) => `$${val.toFixed(2)}`,
                },
              },
              colors: ["#0fbcf9"],
              yaxis: {
                show: false,
              },
              theme: {
                mode: "dark",
              },
              stroke: {
                curve: "smooth",
                width: 5,
              },
            }}
          /> */}
          <APEXChart
            type="candlestick"
            series={[
              {
                name: "Price",
                data:
                  (chartInfo &&
                    chartInfo.map((el) => {
                      return {
                        x: new Date(el.time_close),
                        y: [el.open, el.high, el.low, el.close],
                      };
                    })) ??
                  [],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                type: "candlestick",
                height: 500,
                width: 350,
                toolbar: {
                  show: false,
                },
                background: "transperent",
              },
              xaxis: {
                axisTicks: { show: false },
                type: "datetime",
                labels: {
                  show: false,
                },
              },
              grid: {
                show: false,
              },
              yaxis: {
                show: false,
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
        </>
      )}
    </>
  );
}

export default Chart;
