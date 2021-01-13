import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users/';

class UserService {

    getUserData() {
        return axios.get(API_URL + "profile", {headers: authHeader()})
    }

    updateUserData(username, email, oldPassword, password, name, surname, address, role) {
        return axios.put(API_URL + "profile/update", {
            username: username.trim(),
            email: email.trim(),
            oldPassword,
            password,
            name: name.trim(),
            surname: surname.trim(),
            address,
            role
        }, {headers: authHeader()});
    }

}

export default new UserService();