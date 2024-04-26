import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const url = new URL(req.url as string);
  const districtId = url.searchParams.get("districtId");

  if (!districtId) {
    return NextResponse.json(
      { error: "District ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://emsifa.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`
    );
    const villages = response.data;
    return NextResponse.json(villages);
  } catch (error) {
    console.error("Error fetching villages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
