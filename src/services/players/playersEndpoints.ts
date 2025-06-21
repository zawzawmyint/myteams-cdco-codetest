import { ApiResponse, Player } from "@/utils/definitations/definitations";

export type PlayersResponse = ApiResponse<Player[]>;
export async function fetchAllPlayers(
  page: number = 1,
  perPage: number = 10
): Promise<PlayersResponse> {
  const pagination = page && perPage ? `?page=${page}&per_page=${perPage}` : "";
  const endpoint = `https://api.balldontlie.io/v1/players${pagination}`;

  // You need to get an API key from https://www.balldontlie.io/
  const API_KEY = process.env.BALLDONTLIE_API_KEY || "your-api-key-here";

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      next: { tags: ["players"] },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.log(
        `${response.status} ${response.statusText}. Details: ${errorData}`
      );
      throw new Error(
        `Failed to fetch players: ${response.status} ${response.statusText}. Details: ${errorData}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching players:", error);
    // Preserve the original error message if it's already a detailed error
    if (
      error instanceof Error &&
      error.message.includes("Failed to fetch players")
    ) {
      throw error;
    }
    throw new Error(
      `Error fetching players: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
