import { Schedule } from "@/src/types/types"

export const schedules: Schedule[] = [
  {
    id: "sch_001",
    businessId: "biz_001",

    title: "Meet with John",
    description: "Discuss the new project",

    type: "meeting",
    status: "scheduled",

    startAt: "2026-08-31T10:00:00.000Z",
    endAt: "2026-08-31T11:00:00.000Z",

    allDay: false,

    location: "Office",

    customerId: "cus_001",

    recurrence: {
      enabled: false,
      frequency: "weekly"
    },

    createdAt: "2026-08-30T12:00:00.000Z",
    updatedAt: "2026-08-30T12:00:00.000Z"
  },
  {
    id: "sch_002",
    businessId: "biz_002",

    title: "Quarterly Board Review",
    description: "Review Q3 performance and set targets for Q4",

    type: "meeting",
    status: "scheduled",

    startAt: "2026-09-01T14:00:00.000Z",
    endAt: "2026-09-01T15:30:00.000Z",

    allDay: false,

    location: "Conference Room A",

    customerId: "cus_002",

    recurrence: {
      enabled: true,
      frequency: "monthly"
    },

    createdAt: "2026-08-30T12:00:00.000Z",
    updatedAt: "2026-08-30T12:00:00.000Z"
  },
  {
    id: "sch_003",
    businessId: "biz_003",

    title: "Follow up with Supplier",
    description: "Confirm delivery timeline for the new machinery",

    type: "task",
    status: "in-progress",

    startAt: "2026-09-02T09:00:00.000Z",
    endAt: "2026-09-02T09:30:00.000Z",

    allDay: false,

    location: "Remote",

    customerId: "cus_003",

    recurrence: {
      enabled: false,
      frequency: "weekly"
    },

    createdAt: "2026-08-30T12:00:00.000Z",
    updatedAt: "2026-08-30T12:00:00.000Z"
  },
  {
    id: "sch_004",
    businessId: "biz_004",

    title: "Annual Team Offsite",
    description: "Company offsite and strategy workshop",

    type: "event",
    status: "scheduled",

    startAt: "2026-09-10T08:00:00.000Z",
    endAt: "2026-09-10T17:00:00.000Z",

    allDay: true,

    location: "Riverside Retreat",

    customerId: "cus_004",

    recurrence: {
      enabled: true,
      frequency: "yearly"
    },

    createdAt: "2026-08-30T12:00:00.000Z",
    updatedAt: "2026-08-30T12:00:00.000Z"
  },
  {
    id: "sch_005",
    businessId: "biz_005",

    title: "Payroll Reminder",
    description: "Reminder to approve and release monthly payroll",

    type: "reminder",
    status: "completed",

    startAt: "2026-08-28T16:00:00.000Z",
    endAt: "2026-08-28T16:30:00.000Z",

    allDay: false,

    location: "",

    customerId: "cus_005",

    recurrence: {
      enabled: true,
      frequency: "monthly"
    },

    createdAt: "2026-08-28T12:00:00.000Z",
    updatedAt: "2026-08-29T12:00:00.000Z"
  }
]