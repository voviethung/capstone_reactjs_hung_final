import axios from "axios";

export const TOKEN = 'accessToken';
export const USER_LOGIN = 'userLogin';




export function setCookie(name, value, days = 7) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


//setup interceptor (middleware) cho tất cả request(thông tin gửi đi đến server) và response (kết quả nhận từ server)
const DOMAIN = 'https://shop.cyberlearn.vn';
const TOKEN_CYBERSOFT = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiIxMjM0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlZJRVdfUFJPRklMRSIsIm5iZiI6MTcyNjY0NTIyMSwiZXhwIjoxNzI2NjQ4ODIxfQ.hUqzlxs_6XXucecTbW3_F-CZ2OW1lTE2pe8ItpAMueg';
export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 3000 // giới hạn thời gian chờ kết quả từ server
})
//cấu hình cho request
http.interceptors.request.use((req) => {
    req.headers = {
        ...req.headers, //giữ lại các api có header riêng
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`, //thêm phần chung authorize
        'TokenCybersoft': TOKEN_CYBERSOFT
    }
    return req;
});

//Cấu hình response: 
http.interceptors.response.use((res) => {
    return res;
}, (err) => {
    switch (err?.response.status) {
        case 400: {

        }; break;
        case 404: {

        }; break;
        case 401: {
            
        }; break;
        case 403: {

        }; break;
        case 500: {

        }; break;
    }
    return Promise.reject(err);
})
/*
    statusCode: 
    200: Thành công 
    201: Dữ liệu đã được khởi tạo thành công
    400: Bad request (đường dẫn không hợp lệ)
    404: Not Found (không tìm thấy dữ liệu)
    401: Unauthorize (Lỗi không có quyền truy cập vào api đó)
    403: Forbidden (Không đủ quyền truy cập vào hệ thống)
    500: Error in server (Lỗi xảy ra tại server chưa biết lí do)
    => Vai trò frontend với lỗi 500: 
    + Test lại api qua post man hoặc swagger với dữ liệu mẫu từ backend (BE đúng thì coi lại code). Nếu như post man hoặc swagger bị sai thì báo backend xử lý. 

*/