import { apiOptions, matchesType } from "@/types";

const options: apiOptions = {
  next: { revalidate: 30 },
  headers: {
    "X-Auth-Token": process.env.API_TOKEN,
    "Content-Type": "application/json",
  },
};

export const getMatches = async () => {
  const matchData = await fetch(
    "http://api.football-data.org/v4/competitions/EC/matches?matchday=1",
    options
  );
  return matchData.json();
};

export const getTeams = async () => {
  const teamsData = await fetch(
    "http://api.football-data.org/v4/competitions/BL1/teams",
    options
  );
  return teamsData.json();
};

export const getNewsInfo = async () => {
  const newsData = await fetch(
    `https://newsapi.org/v2/everything?apiKey=${process.env.API_TOKEN_NEWS}&q=soccer&pageSize=5`,
    { next: { revalidate: 20 } }
  );
  return newsData.json();
};

export const filterLeague = async (filterData: string) => {
  const getMatchesData = await getMatches();
  const filterPremierLeague: matchesType[] = getMatchesData?.matches;
  const getData = filterPremierLeague.filter(
    (item) => item.competition.name === filterData
  );
  return getData;
};
