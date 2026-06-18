import { NextRequest, NextResponse } from "next/server";
import { fetchAuthorQuotes } from "../../../lib/data";

export const revalidate = 300;

export async function GET(
	request: NextRequest,
	{ params }: { params: { author: string } }
) {
	const offsetParam = request.nextUrl.searchParams.get("offset");
	const offset = Number(offsetParam);
	const safeOffset = Number.isFinite(offset) && offset > 0 ? offset : 0;
	const quotes = await fetchAuthorQuotes(
		decodeURIComponent(params.author),
		safeOffset
	);

	return NextResponse.json(quotes, {
		headers: {
			"Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
		},
	});
}
