import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT token to every request if available
api.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(
      localStorage.getItem('portfolio-auth') || '{}'
    )
    const token = authData?.state?.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('portfolio-auth')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// Blog endpoints
export const blogApi = {
  getAll: (params) => api.get('/blogs', { params }),
  getOne: (slug) => api.get(`/blogs/${slug}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
}

// Auth endpoints
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  me: () => api.get('/auth/me'),
}

// Contact endpoint
export const contactApi = {
  send: (data) => api.post('/contact', data),
}

export default api
