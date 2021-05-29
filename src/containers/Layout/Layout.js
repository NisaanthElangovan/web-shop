import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Layout.css';
import $ from 'jquery';
import LoginModal from '../../components/LoginModal/LoginModal';
import Chat from '../../components/Chat/Chat';
import ContentModal from '../../components/ContentModal/ContentModal';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import axios from 'axios';
import {ApiUrl} from '../../config';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';
import Spinner from '../../components/Spinner/Spinner';
import MailModal from '../../components/MailModal/MailModal';

class Layout extends Component {

    constructor(props) {
        super(props);

        toastr.options = {
            "closeButton": false,
            "positionClass": "toast-top-center",
            "timeOut": "2000"
        };

        this.state = {
            spinner: false,
            loginEmailClass: '',
            loginPasswordClass: '',
            loginStatus: {
                loginEmailSuccess: '',
                loginEmailError: '',
                loginPasswordSuccess: '',
                loginPasswordError: ''
            },
            registerNameClass: '',
            registerEmailClass: '',
            registerPasswordClass: '',
            registerStatus: {
                registerNameSuccess: '',
                registerNameError: '',
                registerEmailSuccess: '',
                registerEmailError: '',
                registerPasswordSuccess: '',
                registerPasswordError: ''
            },
            loginEmail: false,
            loginPassword: false,
            registerName: false,
            registerEmail: false,
            registerPassword: false,
            customerNameClass: '',
            customerMobileClass: '',
            customerDetails: {
                customerMobileError: '',
                customerMobileSuccess: '',
                customerNameError: '',
                customerNameSuccess: ''
            },
            custName: false,
            custMobile: false,
            customerDate: '',
            customerDrop: '',
            chatModal: false
        };

        this.loginSubmit = this
            .loginSubmit
            .bind(this);
        this.loginValidation = this
            .loginValidation
            .bind(this);
        this.loginCancel = this
            .loginCancel
            .bind(this);

        this.registerSubmit = this
            .registerSubmit
            .bind(this);
        this.registerValidation = this
            .registerValidation
            .bind(this);
        this.registerCancel = this
            .registerCancel
            .bind(this);
        this.mailSubmit = this
            .mailSubmit
            .bind(this);
        this.mailCancel = this
            .mailCancel
            .bind(this);

    
        this.customerDetailValidation = this
            .customerDetailValidation
            .bind(this);
        this.ContentModalClose = this
            .ContentModalClose
            .bind(this);
        this.submitItemDetails= this
            .submitItemDetails
            .bind(this);
    }


    componentDidMount() {
        $(document)
        .ready(function () {
            $('.modal').modal();
        });
        console.log(this.props);
    }

    customerDetailValidation(e) {
        switch (e.target.name) {
            case 'customerName':
                if (this.refs.contentModal.customerName.value === '') {
                    this.setState({
                        customerNameClass: 'invalid',
                        customerDetails: {
                            customerNameSuccess: '',
                            customerNameError: 'Name cannot be empty'
                        },
                        custName: false
                    });
                } else if (!(/^[a-z ,.'-]+$/i).test(this.refs.contentModal.customerName.value)) {
                    this.setState({
                        customerNameClass: 'invalid',
                        customerDetails: {
                            customerNameSuccess: '',
                            customerNameError: 'Enter Correct Name format'
                        },
                        custName: false
                    });
                } else if (this.refs.contentModal.customerName.value !== '') {
                    this.setState({
                        customerNameClass: 'valid',
                        customerDetails: {
                            customerNameSuccess: '',
                            customerNameError: ''
                        },
                        custName: true
                    });
                }
                return;

            case 'customerMobile':
                if (this.refs.contentModal.customerMobile.value === '') {
                    this.setState({
                        customerMobileClass: 'invalid',
                        customerDetails: {
                            customerMobileSuccess: '',
                            customerMobileError: 'Mobile number cannot be empty'
                        },
                        custMobile: false
                    });
                } else if (this.refs.contentModal.customerMobile.value !== '' && 
                (this.refs.contentModal.customerMobile.value.length > 10 || this.refs.contentModal.customerMobile.value.length < 10)) {
                    this.setState({
                        customerMobileClass: 'invalid',
                        customerDetails: {
                            customerMobileSuccess: '',
                            customerMobileError: 'Please enter 10 digit mobile number'
                        },
                        custMobile: false
                    });
                } else if (this.refs.contentModal.customerMobile.value !== '') {
                    this.setState({
                        customerMobileClass: 'valid',
                        customerDetails: {
                            customerMobileSuccess: '',
                            customerMobileError: ''
                        },
                        custMobile: true
                    });
                }
                return;

                case 'customerDrop':
                    this.setState({
                        customerDate: '12 June 2021',
                        customerDrop: this.refs.contentModal.customerDrop.value
                    });
                return;
                
            default:
                this.setState({custName: false, custMobile: false});
                return;
        }
    }

    submitItemDetails(e) {
        if(!this.state.custName || !this.state.custMobile || this.state.customerDrop==='') {
            return;
        }
        this.setState({spinner: true});
        this.customerData = {
            customerName: this.refs.contentModal.customerName.value,
            customerMobile: this.refs.contentModal.customerMobile.value
        };

        // if (this.state.custName && this.state.custMobile) {
        //     axios({
        //         method: 'post',
        //         url: ApiUrl + '/api/custDetails',
        //         data: this.customerData,
        //         headers: {
        //             'Access-Control-Allow-Origin': '*'
        //         }
        //     }).then((res) => {
        //         this.setState({spinner: false});
        //         console.log(res);
        //     }).catch((err) => {
        //         this.setState({spinner: false});
        //         toastr.error(err);
        //         console.log(err);
        //         $('#chatModal').modal('open');
        //     });
        // }
        
        toastr.success("Order Submitted succesfully!");
        $('#itemDetails').modal('close');
        this.setState({spinner: false});
        $('#chatModal').modal('open');
    }


    ContentModalClose(e) {
        this.refs.contentModal.customerMobile.value = '';
        this.refs.contentModal.customerName.value = '';
        this.refs.contentModal.customerDrop.value = '';
        this.setState({
            customerNameClass: '',
            customerMobileClass: '',
            customerDetails: {
                customerMobileError: '',
                customerMobileSuccess: '',
                customerNameError: '',
                customerNameSuccess: ''
            },
            custName: false,
            custMobile: false,
            customerDate: '',
            customerDrop: ''
        });
        $('#itemDetails').modal('close');
    }

    loginValidation(e) {
        switch (e.target.name) {
            case 'loginName':
                if (this.refs.loginModal.email.value === '') {
                    this.setState({
                        loginEmailClass: 'invalid',
                        loginStatus: {
                            loginEmailSuccess: '',
                            loginEmailError: 'Email cannot be empty'
                        },
                        loginEmail: false
                    });
                } else if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(this.refs.loginModal.email.value)) {
                    this.setState({
                        loginEmailClass: 'invalid',
                        loginStatus: {
                            loginEmailSuccess: '',
                            loginEmailError: 'Enter Correct Email format'
                        },
                        loginEmail: false
                    });
                } else if (this.refs.loginModal.email.value !== '') {
                    this.setState({
                        loginEmailClass: 'valid',
                        loginStatus: {
                            loginEmailSuccess: '',
                            loginEmailError: ''
                        },
                        loginEmail: true
                    });
                }
                return;

            case 'loginPassword':
                if (this.refs.loginModal.password.value === '') {
                    this.setState({
                        loginPasswordClass: 'invalid',
                        loginStatus: {
                            loginPasswordSuccess: '',
                            loginPasswordError: 'Password cannot be empty'
                        },
                        loginPassword: false
                    });
                } else if (this.refs.loginModal.password.value !== '') {
                    this.setState({
                        loginPasswordClass: 'valid',
                        loginStatus: {
                            loginPasswordSuccess: '',
                            loginPasswordError: ''
                        },
                        loginPassword: true
                    });
                }
                return;
            default:
                this.setState({loginEmail: false, loginPassword: false});
                return;
        }
    }

    loginSubmit() {
        this.setState({spinner: true});
        this.loginData = {
            email: this.refs.loginModal.email.value,
            password: this.refs.loginModal.password.value
        };

        if (this.state.loginEmail && this.state.loginPassword) {
            axios({
                method: 'post',
                url: ApiUrl + '/api/login',
                data: this.loginData,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then((res) => {
                this.setState({spinner: false});
                console.log(res);
                if (res.data.data === "Login Successful") {
                    sessionStorage.setItem('main.token', res.data.token);
                    toastr.success(res.data.data);
                    $('#login').modal('close');
                    $('#itemDetails').modal('open');
                } else {
                    toastr.error(res.data.data);
                    $('#login').modal('open');
                }
            }).catch((err) => {
                this.setState({spinner: false});
                toastr.error(err);
                console.log(err);
            });

        }
    }

    loginCancel() {
        this.refs.loginModal.email.value = '';
        this.refs.loginModal.password.value = '';
        this.setState({
            loginEmailClass: '',
            loginPasswordClass: '',
            loginStatus: {
                loginEmailSuccess: '',
                loginEmailError: '',
                loginPasswordSuccess: '',
                loginPasswordError: ''
            },
            loginEmail: false,
            loginPassword: false
        });
    }

    registerValidation(e) {
        switch (e.target.name) {
            case 'registerName':
                if (this.refs.registerModal.registerName.value === '') {
                    this.setState({
                        registerNameClass: 'invalid',
                        registerStatus: {
                            registerNameSuccess: '',
                            registerNameError: 'Name cannot be empty'
                        },
                        registerName: false
                    });
                } else if (this.refs.registerModal.registerName.value !== '') {
                    this.setState({
                        registerNameClass: 'valid',
                        registerStatus: {
                            registerNameSuccess: '',
                            registerNameError: ''
                        },
                        registerName: true
                    });
                }
                return;

            case 'registerEmail':
                if (this.refs.registerModal.registerEmail.value === '') {
                    this.setState({
                        registerEmailClass: 'invalid',
                        registerStatus: {
                            registerEmailSuccess: '',
                            registerEmailError: 'Email cannot be empty'
                        },
                        registerEmail: false
                    });
                    console.log(this.state);
                } else if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(this.refs.registerModal.registerEmail.value)) {
                    this.setState({
                        registerEmailClass: 'invalid',
                        registerStatus: {
                            registerEmailSuccess: '',
                            registerEmailError: 'Enter correct Email format'
                        },
                        registerEmail: false
                    });
                } else if (this.refs.registerModal.registerEmail.value !== '') {
                    this.setState({
                        registerEmailClass: 'valid',
                        registerStatus: {
                            registerEmailSuccess: '',
                            registerEmailError: ''
                        },
                        registerEmail: true
                    });
                }
                return;

            case "registerPassword":
                if (this.refs.registerModal.registerPassword.value === '') {
                    this.setState({
                        registerPasswordClass: 'invalid',
                        registerStatus: {
                            registerPasswordSuccess: '',
                            registerPasswordError: 'Password cannot be empty'
                        },
                        registerPassword: false
                    });
                } else if (this.refs.registerModal.registerPassword.value.length < 6) {
                    this.setState({
                        registerPasswordClass: 'invalid',
                        registerStatus: {
                            registerPasswordSuccess: '',
                            registerPasswordError: 'Password cannot be less than 6'
                        },
                        registerPassword: false
                    });
                } else if (this.refs.registerModal.registerPassword.value !== '') {
                    this.setState({
                        registerPasswordClass: 'valid',
                        registerStatus: {
                            registerPasswordSuccess: '',
                            registerPasswordError: ''
                        },
                        registerPassword: true
                    });
                }
                return;
            default:
                this.setState({registerName: false, registerEmail: false, registerPassword: false});
                return;
        }
    }

    registerSubmit() {
        this.setState({spinner: true});
        this.registerData = {
            name: this.refs.registerModal.registerName.value,
            email: this.refs.registerModal.registerEmail.value,
            password: this.refs.registerModal.registerPassword.value
        };

        if (this.state.registerName || this.state.registerEmail || this.state.registerPassword) {
            console.log("Submitted", this.registerData);
            axios({
                method: 'post',
                url: ApiUrl + '/api/register',
                data: this.registerData,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then((res) => {
                this.setState({spinner: false});
                if (res.data.data === 'Registration Successful') {
                    toastr.success(res.data.data);
                    this.setState({registerEmailClass: 'valid'});
                    $('#register').modal('close');
                    $('#login').modal('open');
                } else {
                    $('#register').modal('open');
                    this.setState({registerEmailClass: 'invalid'});
                    toastr.error(res.data.data);
                }
            }).catch((err) => {
                this.setState({spinner: false});
                toastr.error(err);
                console.log(err);
            });
        }
    }

    registerCancel() {
        this.refs.registerModal.registerName.value = '';
        this.refs.registerModal.registerEmail.value = '';
        this.refs.registerModal.registerPassword.value = '';
        this.setState({
            registerNameClass: '',
            registerEmailClass: '',
            registerPasswordClass: '',
            registerStatus: {
                registerNameSuccess: '',
                registerNameError: '',
                registerEmailSuccess: '',
                registerEmailError: '',
                registerPasswordSuccess: '',
                registerPasswordError: ''
            },
            registerName: false,
            registerEmail: false,
            registerPassword: false
        });
    }

    mailSubmit() {
        this.setState({spinner: true});
        this.mailData = {
            mailid: this.refs.mailModal.mail.value
        };
        console.log('this.mailData', this.mailData);
        axios({
            method: 'post',
            url: ApiUrl + '/api/forgetPassword',
            data: this.mailData,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then((res) => {
            this.setState({spinner: false});
            console.log(res);
            if (res.data.data === "Email Exist") {
                toastr.success(res.data.status);
                $('#login').modal('close');
                $('#mail').modal('close');
                this.refs.mailModal.mail.value = '';
            } else {
                toastr.error(res.data.data);
                $('#login').modal('open');
                $('#mail').modal('open');
            }
        }).catch((err) => {
            this.setState({spinner: false});
            toastr.error(err);
            console.log(err);
        });

    }

    mailCancel() {
        this.refs.mailModal.mail.value = '';
    }

    render() {
        return (
            <div style={{
                position: 'relative'
            }}>
                <Navbar/>
                <div className="imageloader responsive-img"></div>
                <LoginModal
                    ref="loginModal"
                    loginEmail={this.state.loginEmail}
                    loginPassword={this.state.loginPassword}
                    loginEmailClass={this.state.loginEmailClass}
                    loginStatus={this.state.loginStatus}
                    loginPasswordClass={this.state.loginPasswordClass}
                    loginValidation={this.loginValidation}
                    loginSubmit={this.loginSubmit}
                    loginCancel={this.loginCancel}/>
                <RegisterModal
                    ref="registerModal"
                    registerName={this.state.registerName}
                    registerEmail={this.state.registerEmail}
                    registerPassword={this.state.registerPassword}
                    registerEmailClass={this.state.registerEmailClass}
                    registerStatus={this.state.registerStatus}
                    registerPasswordClass={this.state.registerPasswordClass}
                    registerValidation={this.registerValidation}
                    registerNameClass={this.state.registerNameClass}
                    registerSubmit={this.registerSubmit}
                    registerCancel={this.registerCancel}/>
                <MailModal
                    ref="mailModal"
                    mailSubmit={this.mailSubmit}
                    mailCancel={this.mailCancel}/> {this.state.spinner
                    ? <Spinner spinner={this.state.spinner}/>
                    : null}
                <ContentModal
                    ref="contentModal"
                    customerNameClass={this.state.customerNameClass}
                    ContentModalClose={this.ContentModalClose}
                    customerDetails={this.state.customerDetails}
                    customerMobileClass={this.state.customerMobileClass}
                    submitItemDetails={this.submitItemDetails}
                    customerDate={this.state.customerDate}
                    customerDetailValidation={this.customerDetailValidation}/>
          
                <div id="chatModal" class="modal">
                    <div class="modal-content">
                        {this.refs.contentModal && this.refs.contentModal.customerName.value &&
                        <h4>Hi {this.refs.contentModal.customerName.value} !</h4>
                        }
                      <p>Feel free to chat with our sales executive!</p>
                    <Chat/>
                    </div>
                    <div class="modal-footer"></div>
                </div>
            </div>
        );
    }
}

export default Layout;