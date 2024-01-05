import { FIXER_API_KEY, FIXER_API_URL } from "../lib/constants";

type Data = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
};

export async function GET() {
  const res = await fetch(
    `${FIXER_API_URL}/latest?access_key=${FIXER_API_KEY}`
  );
  const data: Data = await res.json();

  return Response.json(data);
}
