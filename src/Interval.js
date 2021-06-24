import { Timer } from '@material-ui/icons';
import React, { useEffect } from 'react';

const Interval = ({ timer, setTimer }) => {
  useEffect(() => {
    let id = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className='timer'>
      <Timer />
      Refresh in {timer} sec(s)
    </div>
  );
};

export default Interval;
