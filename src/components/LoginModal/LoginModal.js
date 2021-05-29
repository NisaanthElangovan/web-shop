import React, {Component} from 'react';

class LoginModal extends Component {
    render() {
        return (
            <div id="login" className="modal">
                <div className="modal-content">
                    <h4 style={{
                        textAlign: 'center'
                    }}>Login</h4>
                    <div className="row">
                        <div className="input-field col s12 m8 offset-m2">
                            <i className="material-icons prefix">drafts</i>
                            <input
                                id="email"
                                type="email"
                                name="loginName"
                                className={this.props.loginEmailClass}
                                ref={el => this.email = el}
                                onChange={this.props.loginValidation}/>
                            <label
                                htmlFor="email"
                                data-error={this.props.loginStatus.loginEmailError}
                                data-success={this.props.loginStatus.loginEmailSuccess}>Email</label>
                        </div>
                        <div className="input-field col s12 m8 offset-m2">
                            <i className="material-icons prefix">lock</i>
                            <input
                                id="password"
                                type="password"
                                name="loginPassword"
                                className={this.props.loginPasswordClass}
                                ref={el => this.password = el}
                                onChange={this.props.loginValidation}/>
                            <label
                                htmlFor="password"
                                data-error={this.props.loginStatus.loginPasswordError}
                                data-success={this.props.loginStatus.loginPasswordSuccess}>Password</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button
                        className="modal-action modal-close btn waves-effect teal lighten-2 waves-green btn-flat col s5 offset-s1"
                        onClick={this.props.loginCancel}>Cancel</button>
                    <button
                        className="modal-action btn waves-effect teal lighten-2 waves-green btn-flat col s5"
                        style={{
                        marginLeft: '4px'
                    }}
                        disabled={!this.props.loginEmail || !this.props.loginPassword}
                        onClick={this.props.loginSubmit}>Login</button>
                </div>
                <div
                    className="row"
                    style={{
                    marginTop: '20px'
                }}>
                    <span
                        className="blue-text text-darken-2 col s6"
                        style={{
                        textAlign: 'center'
                    }}>
                        <a
                            className="waves-effect waves-light waves-effect waves-light modal-trigger"
                            href="#register">Register Now?</a>
                    </span>
                    <span
                        className="blue-text text-darken-2 col s6"
                        style={{
                        textAlign: 'center'
                    }}>
                        <a
                            className="waves-effect waves-light  waves-effect waves-light modal-trigger"
                            href="#mail">Forgot Password?</a>
                    </span>
                </div>
            </div>
        );
    }

}

export default LoginModal;