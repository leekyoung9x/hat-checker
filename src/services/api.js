import axios from 'axios';

// Tạo một instance Axios chung
const api = axios.create({
    baseURL: 'https://api.nrohat.com/api/', // API giả lập
    timeout: 5000, // Timeout request
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để xử lý lỗi hoặc token nếu cần
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default api;
