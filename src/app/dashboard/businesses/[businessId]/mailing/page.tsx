"use client"

import Section from "@/src/components/base/layout/section"
import Badge from "@/src/components/base/ui/composites/badge"
import Dropdown from "@/src/components/base/ui/composites/dropdown"
import Table from "@/src/components/base/ui/composites/table"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import { customers } from "@/src/data/customers"
import { ObjectRecordType } from "@/src/types/types"
import { todayIsoDate } from "@/src/utils/todayIsoDate"
import { useMemo, useState } from "react"

type MailStatus = "Sent" | "Draft" | "Scheduled"
type RecordView = "Sent" | "Drafts" | "Scheduled" | "Mail Groups"

type MailRecord = {
  id: string
  subject: string
  audience: string
  recipients: string
  status: MailStatus
  createdAt: string
  sentAt: string
  scheduledFor: string
}

type MailGroup = {
  id: string
  name: string
  customerIds: string[]
}

const initialGroups: MailGroup[] = [
  {
    id: "group-active",
    name: "Active Customers",
    customerIds: customers.filter((customer) => customer.status === "Active").map((customer) => customer.id),
  },
  {
    id: "group-watchlist",
    name: "Watchlist",
    customerIds: customers.filter((customer) => customer.status === "Watchlist").map((customer) => customer.id),
  },
]

const initialMailRecords: MailRecord[] = [
  {
    id: "mail-001",
    subject: "July account update",
    audience: "Active Customers",
    recipients: "7",
    status: "Sent",
    createdAt: "2026-07-30",
    sentAt: "2026-07-30 09:15",
    scheduledFor: "",
  },
  {
    id: "mail-002",
    subject: "Outstanding invoice reminder",
    audience: "Watchlist",
    recipients: "2",
    status: "Scheduled",
    createdAt: "2026-08-10",
    sentAt: "",
    scheduledFor: "2026-08-16 10:00",
  },
  {
    id: "mail-003",
    subject: "New service package announcement",
    audience: "Active Customers",
    recipients: "7",
    status: "Draft",
    createdAt: "2026-08-12",
    sentAt: "",
    scheduledFor: "",
  },
]

function toTableData(records: MailRecord[]): ObjectRecordType[] {
  return records.map((record) => ({
    Subject: record.subject,
    Audience: record.audience,
    Recipients: record.recipients,
    Status: record.status,
    Created: record.createdAt,
    Sent: record.sentAt,
    "Scheduled for": record.scheduledFor,
  }))
}

export default function MailingPage() {
  const [mailRecords, setMailRecords] = useState<MailRecord[]>(initialMailRecords)
  const [mailGroups, setMailGroups] = useState<MailGroup[]>(initialGroups)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [selectedGroupId, setSelectedGroupId] = useState(initialGroups[0]?.id ?? "")
  const [scheduledFor, setScheduledFor] = useState("")
  const [groupName, setGroupName] = useState("")
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([])
  const [recordView, setRecordView] = useState<RecordView>("Sent")

  const selectedGroup = mailGroups.find((group) => group.id === selectedGroupId) ?? mailGroups[0]

  const sentRecords = useMemo(() => mailRecords.filter((record) => record.status === "Sent"), [mailRecords])
  const draftRecords = useMemo(() => mailRecords.filter((record) => record.status === "Draft"), [mailRecords])
  const scheduledRecords = useMemo(() => mailRecords.filter((record) => record.status === "Scheduled"), [mailRecords])

  const groupTableData: ObjectRecordType[] = mailGroups.map((group) => ({
    Group: group.name,
    Contacts: String(group.customerIds.length),
    Emails: group.customerIds
      .map((customerId) => customers.find((customer) => customer.id === customerId)?.email)
      .filter(Boolean)
      .join(", "),
  }))

  const recordDataMap: Record<RecordView, ObjectRecordType[]> = {
    Sent: toTableData(sentRecords),
    Drafts: toTableData(draftRecords),
    Scheduled: toTableData(scheduledRecords),
    "Mail Groups": groupTableData,
  }

  const recordCountMap: Record<RecordView, number> = {
    Sent: sentRecords.length,
    Drafts: draftRecords.length,
    Scheduled: scheduledRecords.length,
    "Mail Groups": mailGroups.length,
  }

  function addMailRecord(status: MailStatus) {
    const trimmedSubject = subject.trim()
    const nextRecord: MailRecord = {
      id: `mail-${Date.now()}`,
      subject: trimmedSubject || "Untitled mail",
      audience: selectedGroup?.name ?? "No group",
      recipients: String(selectedGroup?.customerIds.length ?? 0),
      status,
      createdAt: todayIsoDate(),
      sentAt: status === "Sent" ? new Date().toLocaleString() : "",
      scheduledFor: status === "Scheduled" ? scheduledFor.replace("T", " ") : "",
    }

    setMailRecords((records) => [nextRecord, ...records])
    setSubject("")
    setMessage("")
    setScheduledFor("")
  }

  function toggleCustomer(customerId: string) {
    setSelectedCustomerIds((customerIds) =>
      customerIds.includes(customerId)
        ? customerIds.filter((id) => id !== customerId)
        : [...customerIds, customerId]
    )
  }

  function createGroup() {
    const trimmedName = groupName.trim()

    if (!trimmedName || selectedCustomerIds.length === 0) {
      return
    }

    const nextGroup = {
      id: `group-${Date.now()}`,
      name: trimmedName,
      customerIds: selectedCustomerIds,
    }

    setMailGroups((groups) => [nextGroup, ...groups])
    setSelectedGroupId(nextGroup.id)
    setGroupName("")
    setSelectedCustomerIds([])
  }

  return (
    <Frame className="w-full flex-col h-max">
      <Section>
        <Frame className="justify-between">
          <Frame className="gap-[var(--space-xs)] h-max flex-col">
            <Heading size="xl" type="h1">Mailing</Heading>
            <Paragraph weight="light" size="sm">
              Compose, manage, and send mails to customers.
            </Paragraph>
          </Frame>
          <Button variant="outline" iconPosition="left" iconName="icon-plus" size="sm">Compose Email</Button>
        </Frame>
      </Section>

      <Section>
        <Frame className="w-full justify-between items-center">
          <Frame className="gap-[var(--space-sm)] items-center">
            <Heading size="md" type="h2">Records</Heading>
            <Badge color="accent" size="xs" text={String(recordCountMap[recordView])} />
          </Frame>
          <Dropdown
            name="recordView"
            value={recordView}
            options={["Sent", "Drafts", "Scheduled"]}
            size="sm"
            formFunc={(event) => setRecordView(event.target.value as RecordView)}
          />
        </Frame>
        <Table width="stretch" cellWidth="180px" height="hug" size="xs" data={recordDataMap[recordView]} />
      </Section>
    </Frame>
  )
}