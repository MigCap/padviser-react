import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class AuthService {
  getToken() {
    return localStorage.getItem('auth_token');
  }

  decodeToken(token) {
    return jwt.decode(token);
  }

  savetoken(token) {
    localStorage.setItem('auth_token', token);
  }

  invalidateUser() {
    localStorage.removeItem('auth_token');
  }

  getExpiration(token) {
    const exp = this.decodeToken(token).exp;
    return moment.unix(exp);
  }

  isValid(token) {
    return moment().isBefore(this.getExpiration(token));
  }

  isAuthenticated() {
    const token = this.getToken();

    return token && this.isValid(token) ? true : false;
  }
}

export default new AuthService();
