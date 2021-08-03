import React, { Fragment } from 'react'
import spinnerGif from './spinner.gif'

const Spinner = () =>
  <Fragment>
    <img src={spinnerGif} alt="loading ..." style={{ width: '200px', margin: 'auto', display: 'block' }}></img>
  </Fragment>

export default Spinner