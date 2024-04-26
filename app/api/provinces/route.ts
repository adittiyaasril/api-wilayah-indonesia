import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const response = await axios.get(
      "https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json"
    );
    const provinces = response.data;
    return NextResponse.json(provinces);
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
