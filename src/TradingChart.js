import React, { useEffect, useRef, useState } from 'react'
import TradingViewWidget, { BarStyles } from 'react-tradingview-widget'

const TradingChart = ({ symbol }) => {
  const chartRef = useRef(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    let element = chartRef.current.parentElement
    console.log(element.clientHeight, element.clientWidth)
    setHeight(element.clientHeight)
    setWidth(element.clientWidth)
  }, [])

  return (
    <div className="trading-chart" ref={chartRef}>
      <TradingViewWidget
        symbol={`BINANCE:${symbol.toUpperCase()}USDT`}
        hide_top_toolbar={true}
        BarStyles={BarStyles.HEIKIN_ASHI}
        interval="1"
        height={height - 5}
        width={width - 5}
      />
    </div>
  )
}

export default TradingChart
