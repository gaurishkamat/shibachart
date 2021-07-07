import React from 'react'
import { TrendingDown, ArrowDropDown, TrendingUp } from '@material-ui/icons'
import TradingChart from './TradingChart'

const CardComponent = ({ token }) => {
  const tokenFilter = ['shib', 'eth', 'btc', 'doge']
  return (
    <div
      className="card-body"
      key={token.id}
      style={{
        order: tokenFilter.findIndex((item) => item === token.symbol),
      }}
    >
      <div className="top">
        <div className="left">
          <img src={token.image} alt={token.name}></img>
          <div className="token-name">
            <p>{token.name}</p>
          </div>
          <p className="token-price blink">${token.current_price}</p>
          <div className="market-cap">
            <p>Market Cap</p>
            <p>${token.market_cap}</p>
          </div>
        </div>
        <div className="right">
          <TradingChart symbol={token.symbol} />
        </div>
      </div>
      <div className="bottom">
        <div className="left" style={{ borderBottomLeftRadius: '10px' }}>
          <div
            className="pricechange"
            style={{
              backgroundColor:
                token.price_change_percentage_24h > 0 ? '#228b22' : '#c04000',
            }}
          >
            {token.price_change_percentage_24h.toFixed(2)}%
            <ArrowDropDown
              size="large"
              className={token.price_change_percentage_24h > 0 ? 'up' : 'down'}
            />
          </div>
        </div>
        <div
          className="right"
          style={{
            borderBottomRightRadius: '10px',
          }}
        >
          <div className="high_low">
            <div>
              <p>
                Low 24h
                <TrendingDown style={{ color: '#c04000' }} />
              </p>
              <p> ${token.low_24h}</p>
            </div>

            <div>
              <p>
                High 24h
                <TrendingUp style={{ color: '#228b22' }} />
              </p>
              <p> ${token.high_24h}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardComponent
