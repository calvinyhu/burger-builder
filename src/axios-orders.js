import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-9.firebaseio.com/',
});

export default instance;
