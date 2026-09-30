import { http } from "@/src/http/client"

/*
 * Support requests.
 *
 * A request travels to the stub route the app's other forms already post to, which records
 * the payload on the server and answers with the message it received. Aiki has no support
 * backend yet, and nothing here pretends that a ticket was created: the form is ready for
 * the service, and this one call is the point at which it is connected.
 *
 * BACKEND INTEGRATION POINT: point the url below at Aiki's support endpoint. The payload is
 * already the shape a request would be created from - subject, category, description and
 * the name of the attachment - and sending the file itself is a multipart upload, the way
 * the invoice email route receives one (src/app/api/invoices/email/route.ts).
 */

export type SupportRequest = {
  subject: string
  category: string
  description: string
  // The name of the file the user attached, or an empty string when there is none.
  attachment: string
}

export type SupportRequestResponse = {
  message: string
  data: SupportRequest
}

export function submitSupportRequest(request: SupportRequest) {
  return http<SupportRequestResponse>(
    "/api/post",
    { action: "support", ...request },
    { method: "POST" },
  )
}
