import { Role } from '@saas/auth'

import { api } from './api-client'
interface getMembershipResponse {
  membership: {
    id: string
    role: Role
    organizationId: string
    userId: string
  }
}

export async function getMembership(org: string) {
  const result = await api
    .get(`organizations/${org}/membership`)
    .json<getMembershipResponse>()

  return result
}
