// api/axiosClient.js
import axios from 'axios';

const API_KEY = "c6dd174f3a56bf8147a9365374c0851272e4edb6872f24cc6b9e6c770fcf64d2";

const axiosClient = axios.create({
    baseURL: 'https://apiv3.apifootball.com/', // Base URL genérica
    params: { // Parámetros que se enviarán con cada solicitud
        APIkey: API_KEY, // API key agregada aquí para incluirse en todas las solicitudes
    }
});

export default axiosClient;
