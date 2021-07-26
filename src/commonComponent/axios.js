import axios from 'axios';
import { connect } from 'react-redux';

const instance = axios.create({
    baseURL: 'https://neostore-api.herokuapp.com/api',
    headers: {
        'Content-Type': 'application/json',
        // "Authorization": `Bearer ${user.authentication.user.token}`

      }
})

export default connect() (instance);