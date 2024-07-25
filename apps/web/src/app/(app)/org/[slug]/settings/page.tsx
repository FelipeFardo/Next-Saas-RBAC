import { organizationSchema } from '@saas/auth'

import { OrganizationForm } from '@/app/(app)/org/organization-form'
import { ability, getCurrentOrg } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/get-organization'

import { Billing } from './billing'
import { ShutdownOrganizatonButton } from './shutdown-organization-button'

export default async function Projects() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  const { organization } = await getOrganization(currentOrg!)
  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')

  const authOrganization = organizationSchema.parse(organization)

  const canShutdownOrganization = permissions?.can('delete', authOrganization)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Organization settings</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationForm
                isUpdating
                initialData={{
                  name: organization.name,
                  domain: organization.domain,
                  shouldAttachUsersByDomain:
                    organization.shouldAttachUsersByDomain,
                }}
              />
            </CardContent>
          </Card>
        )}
        {canGetBilling && <Billing />}

        {canShutdownOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Organization settings</CardTitle>
              <CardDescription>
                This will delete all organization data including all projects.
                You cannot undo this action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShutdownOrganizatonButton />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
