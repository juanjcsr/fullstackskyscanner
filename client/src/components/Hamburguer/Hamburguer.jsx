import React from 'react';

import STYLES from './Hamburguer.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const Hamburguer = () => (
  <div>
    <div className={c('hamburguer')} />
    <div className={c('hamburguer')} />
    <div className={c('hamburguer')} />
  </div>
);

export default Hamburguer;
