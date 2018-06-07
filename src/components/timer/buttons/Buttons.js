import React from 'react';

const Buttons = ({
  paused,
  started,
  startTimer,
  togglePaused,
  toggleStarted
}) => {

  const label = () => {
    let x = 'Pause'
    if (paused) {
      x = 'Resume'
    }
    return x;
  }

  const timerButtons = () => {
    if (!started) {
      return (<button style={{
          width: '100%',
          height: '50%',
          margin: '0px',
          borderRadius: '12px'
        }} onClick={startTimer}>Start</button>);

    } else {

      return (<div>
        <button id='pauseBtn' onClick={togglePaused} style={{
            padding: '0px',
            textAlign: 'center',
            width: '50%',
            height: '50%',
            margin: '0px',
            borderRadius: '12px'
          }}>{label()}</button>
        <button onClick={toggleStarted} style={{
            padding: '0px',
            textAlign: 'center',
            width: '50%',
            height: '50%',
            margin: '0px',
            borderRadius: '12px'
          }}>Reset</button>
      </div>);
    }
  }
  return (<div>
    {timerButtons()}
  </div>);
}

export default Buttons;
