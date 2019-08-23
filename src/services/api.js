import axios from 'axios';

const api = axios.create({
    baseURL: 'http://souzaesouzaadvogados.com.br/produtos/qr/api/public/api/customers/'
})

export default api;