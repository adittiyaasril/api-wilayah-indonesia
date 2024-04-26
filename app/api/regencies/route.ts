import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const url = new URL(req.url as string);
  const provinceId = url.searchParams.get("provinceId");

  if (!provinceId) {
    return NextResponse.json(
      { error: "Province ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    );
    const regencies = response.data;
    return NextResponse.json(regencies);
  } catch (error) {
    console.error("Error fetching regencies:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
