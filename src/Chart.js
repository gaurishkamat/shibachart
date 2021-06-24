import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const TokenChart = ({ id, name, days, currentPrice, color }) => {
  const [options, setOptions] = useState({
    chart: {
      id: 'line',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  });
  const [series, setSeries] = useState([
    {
      name: { name },
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);

  //fetch the market data for passed no of days only if the currentPrice changes
  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
    let prices = [];
    let dates = [];

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.prices.forEach((item) => {
          let dt = new Date(item[0]).toISOString().slice(8, 10);
          dates.push(dt);

          // calculating decimal for different crypto tokens
          let fixedDecimal = item[1] < 0.0001 ? 8 : item[1] >= 1 ? 0 : 4;
          let pr = item[1].toFixed(fixedDecimal);
          prices.push(pr);
        });

        let optionsData = {
          chart: {
            id: 'line',
          },
          xaxis: {
            categories: dates,
          },
          theme: {
            monochrome: {
              enabled: true,
              color: color,
              shadeTo: 'light',
              shadeIntensity: 0.65,
            },
          },
        };

        let seriesData = [
          {
            name,
            data: prices,
          },
        ];

        setOptions(optionsData);
        setSeries(seriesData);
      });
    // eslint-disable-next-line
  }, [currentPrice]);

  return (
    <div className='app-chart'>
      <div className='row'>
        <div className='mixed-chart'>
          <Chart
            className='my-chart'
            options={options}
            series={series}
            type='line'
            width='450'
          />
        </div>
      </div>
    </div>
  );
};

export default TokenChart;
