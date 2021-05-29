import React, {Component} from 'react';
import "./Spinner.css";

class Spinner extends Component {

  render() {
    return (
      <div className='spinner'>
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-grey">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Spinner;