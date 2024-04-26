// app/api/districts/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const url = new URL(req.url as string);
  const regencyId = url.searchParams.get("regencyId");

  if (!regencyId) {
    return NextResponse.json(
      { error: "Regency ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${regencyId}.json`
    );
    const districts = response.data;
    return NextResponse.json(districts);
  } catch (error) {
    console.error("Error fetching districts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
