import React, { useEffect, useState } from 'react';
import TradingViewWidget, { Themes, BarStyles } from 'react-tradingview-widget';


const TradingChart = ({symbol}) => {

    const [value, setValue] = useState(0);

    

    useEffect(()=>{
        console.log('Value', value);
    }, [value]);

    return <div className='trading-chart'>
    <TradingViewWidget symbol={`BINANCE:${symbol.toUpperCase()}USDT`} 
      hide_top_toolbar={true}
      BarStyles={BarStyles.HEIKIN_ASHI}
      interval='1'
      height='170px'
      width='420px'/>
      </div>
}


export default TradingChart;
