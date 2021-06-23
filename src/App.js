import './wdyr';
import './App.css';
import { React, useEffect, useState } from 'react';
import { ArrowDropDown, TrendingDown, TrendingUp } from '@material-ui/icons';
import TokenChart from './Chart';
import Interval from './Interval';

const tokenFilter = ['shib', 'eth', 'btc', 'doge'];

const CHART_DAYS = 5;

function App() {
  const [apiData, setApiData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [timer, setTimer] = useState(60);
  // const [timerId, setTimerId] = useState(null);

  const fetchData = () => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
      .then((res) => res.json())
      .then((data) => {
        let filteredData = data.filter((token) =>
          tokenFilter.includes(token.symbol)
        );
        console.log(filteredData);
        setApiData(filteredData);
        setTimer(60);
        // clear previous timer
        // if(timerId){
        //   clearInterval(timerId);
        //   setProgress(0);
        // }

        // let id = setInterval(() => {
        //   setProgress((prevProgress) => {
        //     console.log(prevProgress)
        //     if(prevProgress >=60){
        //       clearInterval(timerId);
        //     }
        //     return (prevProgress >= 60 ? 0 : prevProgress + 1)
        //   });
        // }, 1000);

        // setTimerId(id)
      });

    // if (timeoutId) {
    //   clearTimeout(timeoutId);
    // }

    let id = setTimeout(() => {
      fetchData();
    }, 60000);

    setTimeoutId(id);
  };

  useEffect(() => {
    fetchData();
    // setInterval(() => {
    //   setProgress((prevProgress) => {
    //     console.log(prevProgress);
    //     if (prevProgress >= 60) {
    //       fetchData();
    //       return 0;
    //     }
    //     return prevProgress + 1;
    //   });
    // }, 1000);
  }, []);

  return (
    <div className='App'>
      <div className='loader'>
        <Interval timer={timer} setTimer={setTimer} />
      </div>
      {Array.isArray(apiData) &&
        apiData.length &&
        apiData.map((token) => (
          <div
            key={token.id}
            className='token-card'
            style={{
              order: tokenFilter.findIndex((item) => item === token.symbol),
            }}>
            <div className='token-name'>
              <img src={token.image} alt={token.name}></img>
              <h1>{token.name}</h1>
            </div>
            <p className='token-price'>${token.current_price}</p>
            <div
              className='price-change'
              style={{
                backgroundColor:
                  token.price_change_percentage_24h > 0 ? '#228b22' : '#c04000',
              }}>
              <ArrowDropDown
                size='large'
                className={
                  token.price_change_percentage_24h > 0 ? 'up' : 'down'
                }
              />
              {token.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className='market-cap'>Market Cap ${token.market_cap}</div>
            <TokenChart
              id={token.id}
              name={token.name}
              days={CHART_DAYS}
              currentPrice={token.current_price}
            />
            <div className='high_low'>
              <p>
                Low 24h
                <TrendingDown style={{ color: '#c04000' }} />- ${token.low_24h}
              </p>
              <p>
                High 24h
                <TrendingUp style={{ color: '#228b22' }} />- ${token.high_24h}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
