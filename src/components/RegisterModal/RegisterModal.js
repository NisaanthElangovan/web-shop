import React, {Component} from 'react';

class RegisterModal extends Component {
    render() {
        return (
            <div id="register" className="modal">
                <div className="modal-content">
                    <h4 style={{
                        textAlign: 'center'
                    }}>Register</h4>
                    <div className="row">
                        <div className="input-field col s12 m8 offset-m2">
                            <i className="material-icons prefix">person</i>
                            <input
                                id="name"
                                type="text"
                                name="registerName"
                                className={this.props.registerNameClass}
                                ref={el => this.registerName = el}
                                onChange={this.props.registerValidation}/>
                            <label
                                htmlFor="name"
                                data-error={this.props.registerStatus.registerNameError}
                                data-success={this.props.registerStatus.registerNameSuccess}>Name</label>
                        </div>
                        <div className="input-field col s12 m8 offset-m2">
                            <i className="material-icons prefix">contact_mail</i>
                            <input
                                id="registerEmail"
                                type="email"
                                name="registerEmail"
                                className={this.props.registerEmailClass}
                                ref={el => this.registerEmail = el}
                                onChange={this.props.registerValidation}/>
                            <label
                                htmlFor="email"
                                data-error={this.props.registerStatus.registerEmailError}
                                data-success={this.props.registerStatus.registerEmailSuccess}>Email</label>
                        </div>
                        <div className="input-field col s12 m8 offset-m2">
                            <i className="material-icons prefix">lock</i>
                            <input
                                id="registerPassword"
                                type="password"
                                name="registerPassword"
                                className={this.props.registerPasswordClass}
                                ref={el => this.registerPassword = el}
                                onChange={this.props.registerValidation}/>
                            <label
                                htmlFor="password"
                                data-error={this.props.registerStatus.registerPasswordError}
                                data-success={this.props.registerStatus.registerPasswordError}>Password</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button
                        className="modal-action modal-close btn waves-effect teal lighten-2 waves-green btn-flat col s5 offset-s1"
                        onClick={this.props.registerCancel}>Clear</button>
                    <button
                        className="modal-action modal-open btn waves-effect teal lighten-2 waves-green btn-flat col s5"
                        style={{
                        marginLeft: '4px'
                    }}
                        disabled={!this.props.registerName || !this.props.registerEmail || !this.props.registerPassword}
                        onClick={this.props.registerSubmit}>Register</button>
                </div>
            </div>
        );
    }
}

export default RegisterModal;