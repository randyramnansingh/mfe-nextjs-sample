import React, { useEffect } from 'react';

const ExportredTitle = ({user}) => {
  console.log('---------loading remote component---------');
  useEffect(() => {
    console.log('HOOKS WORKS');
  }, []);
  return (
    <div className="hero">
      <h1 className="title">
        {' '}
        This came from <code>checkout app</code> !!!
      </h1>
      <p className="description">Props passed in are: {JSON.stringify(user)}</p>
    </div>
  );
};

export default ExportredTitle;
