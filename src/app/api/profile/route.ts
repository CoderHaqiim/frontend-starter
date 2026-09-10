import { Profile } from "@/src/types/types"
import { NextResponse } from "next/server"

const profile: Profile = {
  profilePicture: "/images/akeem.png",
  userName: "Haqiim",
  userId: 90,
  userRole: "Business owner",
}

export async function GET() {
  return NextResponse.json(profile)
}