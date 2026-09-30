"use client"

import { getIntegrationDefinition } from "@/src/integrations/registry"
import {
  getIntegration,
  integrationQueryKey,
  integrationsQueryKey,
  isProblemOutcome,
  updateIntegrationPermissions,
} from "@/src/services/integrationService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { IntegrationProblem, IntegrationPermission, IntegrationProvider, PermissionRisk } from "@/src/types/integrations"
import { ToastType } from "@/src/types/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Badge from "../../base/ui/composites/badge"
import Card from "../../base/ui/composites/card"
import Spinner from "../../base/ui/composites/spinner"
import Button from "../../base/ui/primitives/button"
import Checkbox from "../../base/ui/primitives/checkbox"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Icon from "../../base/ui/primitives/icon"
import Paragraph from "../../base/ui/primitives/paragraph"
import IntegrationProblemNotice from "./integrationProblemNotice"

// How a permission's reach reads, so "looks only" and "changes something" are never only a
// colour.
const riskAppearance: Record<PermissionRisk, { color: "muted" | "warning"; label: string }> = {
  read: { color: "muted", label: "Looks only" },
  send: { color: "warning", label: "Sends out" },
  write: { color: "warning", label: "Changes data" },
}

/*
 * What the user lets this integration do.
 *
 * The switches are answered here and sent together: nothing leaves the screen as they are
 * moved, and the whole list is saved once, when the user says they are done. That list is
 * what the backend reads to know what the integration may do, and the answer the route gives
 * back is what the screen shows - so nothing is ever reported as saved unless it was.
 *
 * Closing without saving leaves the saved list exactly as it was, which is why the two
 * buttons say which of the two the user is doing.
 */
type PermissionsPanelProps = {
  provider: IntegrationProvider
}

export default function PermissionsPanel({ provider }: PermissionsPanelProps) {
  const definition = getIntegrationDefinition(provider)
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const queryClient = useQueryClient()

  // The answers being given, before they are saved. A switch that has not been touched reads
  // from the server, so the draft and the saved list are the same thing until one is moved.
  const [draft, setDraft] = useState<Record<string, boolean>>({})
  const [problem, setProblem] = useState<IntegrationProblem | null>(null)

  const detailQuery = useQuery({
    queryKey: integrationQueryKey(provider),
    queryFn: () => getIntegration(provider),
  })

  const detail = detailQuery.data
  const permissions = detail?.permissions ?? []

  // What the screen shows for one switch: the answer being given, or the saved one.
  const answerFor = (permission: IntegrationPermission) => draft[permission.id] ?? permission.enabled
  const allowedCount = permissions.filter((permission) => answerFor(permission)).length
  const hasChanges = permissions.some((permission) => answerFor(permission) !== permission.enabled)

  const closeForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const save = useMutation({
    mutationFn: (permissionIds: string[]) => updateIntegrationPermissions(provider, permissionIds),
    onSuccess: (response) => {
      // A save the route refused is explained where the switches are, and the panel stays open
      // with the answers still in it, so nothing has to be given again.
      if (isProblemOutcome(response)) {
        setProblem(response.problem)

        return
      }

      const toast: ToastType = {
        variant: "success",
        title: `${definition.name} saved`,
        message: response.message,
      }

      showToast(toast)

      queryClient.invalidateQueries({ queryKey: integrationsQueryKey })
      queryClient.invalidateQueries({ queryKey: integrationQueryKey(provider) })

      closeForm()
    },
  })

  const isBusy = save.isPending

  return (
    <Card width="min(600px, 94vw)" height="min(760px, 88vh)" padding="xl">
      <Frame specificStyles={{ position: "absolute", top: "15px", right: "15px" }}>
        <CloseButton size="sm" func={closeForm} />
      </Frame>

      <Frame className="w-full items-center flex-wrap gap-[var(--space-sm)] mb-[var(--space-md)]">
        <Heading size="md" type="h2">
          {definition.name}
        </Heading>
      </Frame>

      {detailQuery.isPending && (
        <Frame className="w-full flex-1 items-center justify-center gap-[var(--space-sm)]">
          <Spinner size="md" />
          <Paragraph size="xs">Reading your {definition.name} permissions...</Paragraph>
        </Frame>
      )}

      {detailQuery.isError && (
        <Frame className="w-full flex-1 flex-col">
          <IntegrationProblemNotice
            problem={{
              title: "Something went wrong",
              message: `The ${definition.name} permissions could not be read.`,
              nextStep: "Try again. If it keeps happening, contact support.",
            }}
            isBusy={detailQuery.isFetching}
            onAction={() => detailQuery.refetch()}
          />
        </Frame>
      )}

      {detail && (
        <Frame className="w-full flex-1 flex-col gap-[var(--space-xl)] overflow-y-auto scrollVisible">
          {/* What this integration is, and who allows it. */}
          <Frame className="w-full flex-col gap-[var(--space-sm)]">
            <Paragraph size="xs">{definition.description}</Paragraph>
            <Paragraph size="xxs" weight="light">
              {definition.howItWorks}
            </Paragraph>

            {definition.summary.length > 0 && (
              <Frame className="w-full flex-col gap-[var(--space-xs)] border border-[var(--color-outline1)] rounded-[var(--radius-sm)] p-[var(--space-md)]">
                <Paragraph size="xxs" weight="medium" color="textColor1">
                  {definition.summaryHeading}
                </Paragraph>
                {definition.summary.map((line) => (
                  <Frame key={line} className="w-full items-start gap-[var(--space-sm)]">
                    <Icon name="icon-notes" size="sm" color="muted" stroke="1.5" />
                    <Paragraph size="xxs" className="flex-1">
                      {line}
                    </Paragraph>
                  </Frame>
                ))}
              </Frame>
            )}
          </Frame>

          {/* The switches, one per thing the integration may do. Nothing is sent as they are
              moved; the whole list goes when the user saves. */}
          <section
            aria-label={`What the ${definition.name} integration may do`}
            className="flex w-full flex-col gap-[var(--space-md)]"
          >
            <Frame className="w-full items-center justify-between flex-wrap gap-[var(--space-sm)]">
              <Heading size="sm" type="h3">
                What this may do
              </Heading>
              <Badge
                color={allowedCount > 0 ? "success" : "muted"}
                size="xxs"
                text={`${allowedCount} of ${permissions.length} on`}
                className="w-max"
              />
            </Frame>

            {permissions.map((permission) => (
              <Frame
                key={permission.id}
                className="w-full items-start gap-[var(--space-sm)] border border-[var(--color-outline1)] rounded-[var(--radius-sm)] p-[var(--space-md)]"
              >
                <Checkbox
                  name={permission.id}
                  checked={answerFor(permission)}
                  disabled={isBusy}
                  ariaLabel={permission.name}
                  onChange={(event) => {
                    // A new answer replaces the problem of a save that failed, so the notice
                    // never describes a list the user has already moved on from.
                    setProblem(null)
                    setDraft((current) => ({ ...current, [permission.id]: event.target.checked }))
                  }}
                />

                <Frame className="flex-1 flex-col gap-[var(--space-xxs)]">
                  <Frame className="w-full flex-wrap items-center gap-[var(--space-xs)]">
                    <Paragraph size="xxs" weight="medium" color="textColor1">
                      {permission.name}
                    </Paragraph>
                    <Badge
                      color={riskAppearance[permission.risk].color}
                      size="xxs"
                      text={riskAppearance[permission.risk].label}
                      className="w-max"
                    />
                  </Frame>
                  <Paragraph size="xxs">{permission.explanation}</Paragraph>
                </Frame>
              </Frame>
            ))}

            <Paragraph size="xxs" weight="light">
              Nothing is sent while you move these. When you save, the list you have left
              switched on goes in one go, and turning one off stops the integration using it
              straight away.
            </Paragraph>
          </section>
        </Frame>
      )}

      {problem && (
        <Frame className="w-full mt-[var(--space-md)]">
          <IntegrationProblemNotice problem={problem} />
        </Frame>
      )}

      <Frame className="w-full items-center justify-between flex-wrap gap-[var(--space-sm)] mt-[var(--space-md)]">
        <Paragraph size="xxs" weight="light">
          {hasChanges ? "You have changes that are not saved yet." : "Nothing is sent until you save."}
        </Paragraph>

        <Frame className="gap-[var(--space-sm)]">
          <Button variant="ghost" size="sm" disabled={isBusy} func={closeForm}>
            Cancel
          </Button>
          <Button
            variant="fill"
            size="sm"
            disabled={!hasChanges || isBusy}
            func={() => save.mutate(permissions.filter(answerFor).map((permission) => permission.id))}
          >
            {isBusy ? "Saving..." : "Save"}
          </Button>
        </Frame>
      </Frame>
    </Card>
  )
}
