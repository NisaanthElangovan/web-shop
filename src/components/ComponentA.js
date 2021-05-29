import React, {Component} from 'react';
import toastr from 'toastr';
import {withRouter} from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';

class ComponentA extends Component {

    constructor(props) {
        super(props);
        this.logout = this
            .logout
            .bind(this);

        this.state = {
            spinner: false
        };

        console.log('props', this.props);
    }

    logout() {
        sessionStorage.removeItem('main.token');
        this
            .props
            .history
            .replace('/');
        toastr.success('Logout Successful');
    }

    render() {
        return (

            <div style={{
                position: 'relative'
            }}>
                <div
                    className='logout'
                    style={{
                    float: 'right',
                    marginRight: '05px',
                    width: '100px',
                    textAlign: 'center',
                    backgroundColor: 'transparent'
                }}
                    onClick={this.logout}>
                    <li >
                        <a
                            className="waves-effect waves-light  waves-effect waves-light"
                            style={{
                            color: 'white'
                        }}>
                            <i className="material-icons right">directions</i>Logout</a>
                    </li>
                </div>
                <div className="imageloader responsive-img"></div>
                <div
                    className="container"
                    style={{
                    marginTop: '0px',
                    fontSize: '36px',
                    textAlign: 'center'
                }}>Welcome !</div>
                {this.state.spinner
                    ? <Spinner spinner={this.state.spinner}/>
                    : null}
            </div>
        );
    }
}

export default withRouter(ComponentA);