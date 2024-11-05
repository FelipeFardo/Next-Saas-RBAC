import { api } from './api-client'

interface TransferOwnershipRequest {
  org: string
  transferToUserId: string
}

export async function transferOwnership({
  org,
  transferToUserId,
}: TransferOwnershipRequest) {
  await api.patch(`organizations/${org}/owner`, {
    json: { transferToUserId },
  })
}
