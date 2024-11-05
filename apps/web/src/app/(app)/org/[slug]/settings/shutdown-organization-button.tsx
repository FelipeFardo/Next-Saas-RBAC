import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { shutdownOrganization } from '@/http/shutdown-organization'

export function ShutdownOrganizatonButton() {
  async function ShutdownOrganizatonAction() {
    'use server'

    const currentOrg = getCurrentOrg()

    await shutdownOrganization({ org: currentOrg! })

    redirect('/')
  }
  return (
    <form action={ShutdownOrganizatonAction}>
      <Button type="submit" variant="destructive" className="w-56">
        <XCircle className="mr-2 size-4" />
        Shutdown Organization
      </Button>
    </form>
  )
}
