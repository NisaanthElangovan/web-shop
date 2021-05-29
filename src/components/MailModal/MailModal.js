import React, {Component} from 'react';

class MailModal extends Component {
    render() {
        return (
            <div id="mail" className="modal">
                <div className="modal-content">
                    <h5 style={{
                        textAlign: 'center'
                    }}>Enter Email</h5>
                    <div className="row">
                        <div className="input-field col s12 m8 offset-m2">
                            <i className="material-icons prefix">drafts</i>
                            <input
                                id="mail"
                                type="email"
                                name="mailId"
                                className={''}
                                ref={el => this.mail = el}/>
                            <label htmlFor="email" data-error={''} data-success={''}>Email</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button
                        className="modal-action modal-close btn waves-effect teal lighten-2 waves-green btn-flat col s5 offset-s1"
                        onClick={this.props.mailCancel}>Cancel</button>
                    <button
                        className="modal-action btn waves-effect teal lighten-2 waves-green btn-flat col s5"
                        style={{
                        marginLeft: '4px'
                    }}
                        onClick={this.props.mailSubmit}>Submit</button>
                </div>
            </div>
        );
    }

}

export default MailModal;