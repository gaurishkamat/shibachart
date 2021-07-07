import './wdyr'
import './App.css'
import { React, useEffect, useState } from 'react'
import Interval from './Interval'
import CardComponent from './CardComponent'

const tokenFilter = ['shib', 'eth', 'btc', 'doge']

function App() {
  const [apiData, setApiData] = useState([])
  const [timer, setTimer] = useState(60)
  let id = undefined
  // const [timerId, setTimerId] = useState(null);

  const fetchData = () => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    )
      .then((res) => res.json())
      .then((data) => {
        let filteredData = data.filter((token) =>
          tokenFilter.includes(token.symbol),
        )
        console.log(filteredData)
        setApiData(filteredData)
        setTimer(60)
      })

    id = setTimeout(() => {
      fetchData()
    }, 60000)
  }

  useEffect(() => {
    fetchData()

    return () => {
      if (id) {
        clearTimeout(id)
      }
    }
    //eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <div className="loader">
        <Interval timer={timer} setTimer={setTimer} />
      </div>
      {Array.isArray(apiData) && apiData.length
        ? apiData.map((token) => <CardComponent token={token} />)
        : null}
    </div>
  )
}

export default App
