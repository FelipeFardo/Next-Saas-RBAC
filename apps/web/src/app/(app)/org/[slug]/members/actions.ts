'use server'

import type { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'
import { updateMember } from '@/http/update-member'

export async function removeMemberAction(memberId: string) {
  const currentOrg = getCurrentOrg()

  try {
    await removeMember({
      org: currentOrg!,
      memberId,
    })
    revalidateTag(`${currentOrg}/members`)
  } catch (error) {}
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = getCurrentOrg()

  try {
    await updateMember({
      org: currentOrg!,
      memberId,
      role,
    })
    revalidateTag(`${currentOrg}/members`)
  } catch (error) {}
}
