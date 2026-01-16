import makeApiRequest from './apiService.tsx'

interface LoginResponse {
  access_token: string
}

interface RegisterResponse {
  user_id: number
  username: string
}

interface RefreshResponse {
  access_token: string
}

const register = async (
  username: string,
  password: string
): Promise<RegisterResponse> => {
  return makeApiRequest('register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
}

const login = async (
  username: string,
  password: string
): Promise<{ username: string }> => {
  const response: LoginResponse = await makeApiRequest('login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })

  if (response.access_token) {
    sessionStorage.setItem('accessToken', response.access_token)
  }

  return { username }
}

const logout = async (): Promise<void> => {
  await makeApiRequest('auth/logout', {
    method: 'POST',
  })
  sessionStorage.removeItem('accessToken')
}

const getAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken')
}

const refreshAccessToken = async (): Promise<string> => {
  const response: RefreshResponse = await makeApiRequest('refresh-token', {
    method: 'POST',
  })

  if (response.access_token) {
    sessionStorage.setItem('accessToken', response.access_token)
  }

  return response.access_token
}

const isLoggedIn = (): boolean => {
  return !!sessionStorage.getItem('accessToken')
}

export default {
  register,
  login,
  logout,
  getAccessToken,
  refreshAccessToken,
  isLoggedIn,
}
