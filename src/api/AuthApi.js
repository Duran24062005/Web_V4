import axios from "axios";

// Configuración base de la API
const authApi = axios.create({
    baseURL: import.meta.env.VITE_URL_BASE_API || "http://localhost:4000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para agregar el token a cada request
authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de autenticación
authApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default authApi;