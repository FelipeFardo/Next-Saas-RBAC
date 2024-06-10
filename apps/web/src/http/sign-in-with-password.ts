import { api } from './api-client'

interface signWithPasswordRequest {
  email: string
  password: string
}
interface signWithPasswordResponse {
  token: string
}

export async function signWithPassword({
  email,
  password,
}: signWithPasswordRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<signWithPasswordResponse>()

  return result
}
