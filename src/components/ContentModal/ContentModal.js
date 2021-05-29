import React, {Component} from 'react';

class ContentModal extends Component {
    render() {
        return (
            <div id="itemDetails" className="modal">
                <div className="modal-content">
                    <h4 style={{
                        textAlign: 'center'
                    }}>Please Enter your details and the item to be purchased!</h4>
                    
                    <div className="row">
                        <div className="input-field col s12 m8 offset-m2">
                            <i className="material-icons prefix">face</i>
                            <input
                                id="customerName"
                                type="text"
                                name="customerName"
                                className={this.props.customerNameClass}
                                ref={el => this.customerName = el}
                                onChange={this.props.customerDetailValidation}/>
                            <label
                                htmlFor="customerName"
                                data-error={this.props.customerDetails.customerNameError}
                                data-success={this.props.customerDetails.customerNameSuccess}>Enter your name</label>
                        </div>
                        <div className="input-field col s12 m8 offset-m2">
                            <i className="material-icons prefix">phone</i>
                            <input
                                id="customerMobile"
                                type="number"
                                name="customerMobile"
                                className={this.props.customerMobileClass}
                                ref={el => this.customerMobile = el}
                                onChange={this.props.customerDetailValidation}/>
                            <label
                                htmlFor="customerMobile"
                                data-error={this.props.customerDetails.customerMobileError}
                                data-success={this.props.customerDetails.customerMobileSuccess}>Enter mobile number</label>
                        </div>

                       <div align='center' className="col s12 m8 offset-m2">
                        <select className="browser-default" onChange={this.props.customerDetailValidation}
                            ref={el => this.customerDrop = el} id="customerDrop" name="customerDrop">
                            <option value="" disabled selected>Choose Item to Order</option>
                            <option value="IPhone 12">IPhone 12</option>
                            <option value="Samsung M5">Samsung M5</option>
                            <option value="One Plus 9">One Plus 9</option>
                            <option value="LG G9">LG G9</option>
                            <option value="Oppo X8">Oppo X8</option>
                        </select>
                        </div> 

                        <div className="input-field col s12 m8 offset-m2">
                            <i className="material-icons prefix">today</i>
                            <input
                                id="customerDate"
                                type="text"
                                name="customerDate"
                                disabled
                                ref={el => this.customerDate = el}
                                onChange={this.props.customerDetailValidation}/>
                            <label>{this.props.customerDate ? this.props.customerDate : 'Expected delivery date/time'}</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button
                        className="modal-action modal-close btn waves-effect teal lighten-2 waves-green btn-flat col s5 offset-s1"
                        onClick={this.props.ContentModalClose}>Close</button>
                    <button
                        className="modal-action btn waves-effect teal lighten-2 waves-green btn-flat col s5"
                        style={{
                        marginLeft: '4px'
                    }}
                        onClick={this.props.submitItemDetails}>Submit</button>
                </div>          
            </div>
        );
    }

}

export default ContentModal;