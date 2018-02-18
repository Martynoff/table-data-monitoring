import React from 'react';

export default ({ width, data, style }) => (
  <div className='row' style={style}>
    {data.map(item => (
      <div
        className={`item${item.warning ? ' warning' : ''}`}
        style={{width}}
        key={item.id}
      >
        <img src={item.type}/>
        <div className="info">
          <div>Name: {item.name}</div>
          <div>Players: {item.players}</div>
          <div>Max Players: {item.maxPlayers}</div>
        </div>
      </div>
    ))}
  </div>
);
