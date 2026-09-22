import { NextResponse } from "next/server"

/*
 * Stub endpoint for the "Email" action on the view receipt page.
 *
 * The receipt PDF travels as a multipart upload together with the customer it is
 * addressed to. Nothing is sent from here yet: the payload is logged so the
 * frontend can be checked end to end.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const attachment = formData.get("file")
    const name = formData.get("name")
    const email = formData.get("email")

    const pdf = attachment instanceof File ? attachment : null

    console.log("Receipt email payload received:", {
      name: typeof name === "string" ? name : "",
      email: typeof email === "string" ? email : "",
      attachment: pdf
        ? { fileName: pdf.name, type: pdf.type, size: `${pdf.size} bytes` }
        : null,
    })

    return NextResponse.json({
      message: "Receipt email received successfully",
      data: {
        name: typeof name === "string" ? name : "",
        email: typeof email === "string" ? email : "",
        attachment: pdf?.name ?? "",
      },
    })
  } catch (error) {
    console.error("Failed to read the receipt email payload:", error)

    return NextResponse.json(
      { message: "Invalid form data payload" },
      { status: 400 }
    )
  }
}
