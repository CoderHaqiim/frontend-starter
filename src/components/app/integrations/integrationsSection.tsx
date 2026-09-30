"use client"

import { useBackdropState } from "@/src/store/backdropState"
import { getIntegrations, integrationsQueryKey } from "@/src/services/integrationService"
import { IntegrationSummary } from "@/src/types/integrations"
import { useQuery } from "@tanstack/react-query"
import Badge from "../../base/ui/composites/badge"
import Spinner from "../../base/ui/composites/spinner"
import Button from "../../base/ui/primitives/button"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Paragraph from "../../base/ui/primitives/paragraph"
import IntegrationProblemNotice from "./integrationProblemNotice"
import PermissionsPanel from "./permissionsPanel"
import Section from "../../base/layout/section"

// Where the user stands with one integration, in one line.
function describeAllowed(summary: IntegrationSummary) {
  if (summary.allowedCount === 0) return `${summary.description} Nothing is allowed yet.`

  if (summary.allowedCount === summary.permissionCount) {
    return `${summary.description} All ${summary.permissionCount} permissions are allowed.`
  }

  return `${summary.description} ${summary.allowedCount} of ${summary.permissionCount} permissions are allowed.`
}

/*
 * The integrations this app offers, and what the user has allowed each one to do.
 *
 * Every row is read from /api/integrations rather than written into the page, so a row says
 * what the server holds. There is one thing to open on a row - the permissions the user
 * answers for - because an integration has nothing to connect: what the user allows is the
 * whole of it.
 */
export default function IntegrationsSection() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const integrations = useQuery({
    queryKey: integrationsQueryKey,
    queryFn: getIntegrations,
  })

  const summaries = integrations.data ?? []

  const openPermissions = (summary: IntegrationSummary) => {
    setBackdropOpen(true)
    setBackdropContent(<PermissionsPanel provider={summary.provider} />)
  }

  return (
    <Section>
      <Frame className="flex w-full flex-col gap-[var(--space-md)] border border-[var(--color-outline1)] bg-[var(--color-white)] p-[var(--space-lg)] rounded-[var(--radius-md)]">
        <Heading size="md" type="h2">
          Integrations
        </Heading>

        <Paragraph size="xxs" weight="light">
          What each integration is allowed to do. Everything starts off, and what you switch on
          is what it may look at or change for you.
        </Paragraph>

        {integrations.isPending && (
          <Frame className="w-full items-center gap-[var(--space-sm)]">
            <Spinner size="sm" />
            <Paragraph size="xs">Reading your integrations...</Paragraph>
          </Frame>
        )}

        {integrations.isError && (
          <IntegrationProblemNotice
            problem={{
              title: "Something went wrong",
              message: "The integrations could not be read.",
              nextStep: "Try again. If it keeps happening, contact support.",
            }}
            isBusy={integrations.isFetching}
            onAction={() => integrations.refetch()}
          />
        )}

        {summaries.map((summary) => (
          <Frame
            key={summary.provider}
            className="flex w-full flex-col gap-[var(--space-sm)] border-b border-[var(--color-outline1)] pb-[var(--space-md)] last:border-b-0 last:pb-0"
          >
            <Frame className="flex w-full flex-wrap items-start justify-between gap-[var(--space-md)]">
              <Frame className="min-w-[220px] flex-1 flex-col gap-[var(--space-xxs)]">
                <Frame className="w-full flex-wrap items-center gap-[var(--space-sm)]">
                  <Paragraph size="sm" color="textColor1" weight="medium">
                    {summary.name}
                  </Paragraph>

                  <Badge
                    color={summary.allowedCount > 0 ? "success" : "muted"}
                    iconName={summary.allowedCount > 0 ? "icon-badge-check" : "icon-badge-info"}
                    size="xs"
                    text={`${summary.allowedCount} of ${summary.permissionCount} on`}
                    className="w-max"
                  />
                </Frame>

                <Paragraph size="xs">{describeAllowed(summary)}</Paragraph>
              </Frame>

              <Button variant="outline" size="xs" func={() => openPermissions(summary)}>
                {summary.actionLabel}
              </Button>
            </Frame>
          </Frame>
        ))}
      </Frame>
    </Section>
  )
}
