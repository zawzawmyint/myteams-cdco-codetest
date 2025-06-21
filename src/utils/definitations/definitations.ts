export interface ApiResponse<T> {
  status: "success" | "failed";
  message: string;
  data: T;
  //   metadata?: PaginationMetadata;
}

// Main Player type
export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height: string; // Format: "6-11"
  weight: string; // Weight in pounds as string
  jersey_number: string | null; // Can be null for players without numbers
  college: string | null; // Can be null for international players
  country: string;
  draft_year: number | null; // Can be null for undrafted players
  draft_round: number | null; // Can be null for undrafted players
  draft_number: number | null; // Can be null for undrafted players
  teamId: string | null;
}

// Team type (referenced in Player.team)
export interface Team {
  id: number;
  name: string;
  playerCount: number;
  region: string;
  country: string;
  players: Player[]; // Array of players on the team
}
