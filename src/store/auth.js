import axios from 'axios';
import { ApiUrl } from '../config';

class Auth {
    static verifyToken() {
        return new Promise(function (resolve, reject) {
            axios({
                method: 'post',
                url: ApiUrl + '/api/verify',
                data: null,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('main.token')}`,
                    'Access-Control-Allow-Origin': '*'
                }
            }).then((res) => {
                console.log('Auth', res.data.auth);
                if (res.data.auth && res.data.status === "authorized") {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((err) => {
                console.log('Auth', err);
                if (err)
                    resolve(false);
            }
                );
        })
    };
}

export default Auth;