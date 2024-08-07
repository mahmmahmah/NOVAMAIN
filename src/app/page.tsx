import Image from "next/image";
import { getMatches } from "@/api";
import "./globals.css";

const Brasileiro = async () => {
  const getMatchesData = await getMatches();
  const matches = getMatchesData.matches;
  const competitionName = getMatchesData.competition.name;

  return (
    <section className="flex flex-col items-center px-2 md:px-4 md:w-full">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-4 rounded-lg inline-block">
            {competitionName}
          </h1>
        </div>
        <div>
          {matches.map((match: any) => (
            <div
              key={match.id}
              className="mb-8 p-4 bg-gray-800 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold mb-2 text-center">
                {match.homeTeam.name} vs {match.awayTeam.name}
              </h2>
              <div className="flex justify-center items-center mb-4">
                <Image
                  src={match.homeTeam.crest}
                  alt={`${match.homeTeam.name} logo`}
                  width={50}
                  height={50}
                  className="mr-4"
                />
                <span className="text-xl font-bold">vs</span>
                <Image
                  src={match.awayTeam.crest}
                  alt={`${match.awayTeam.name} logo`}
                  width={50}
                  height={50}
                  className="ml-4"
                />
              </div>
              <div className="text-center">
                <p className="text-lg mb-1">
                  Date: {new Date(match.utcDate).toLocaleDateString()}
                </p>
                <p className="text-lg mb-1">Venue: {match.venue}</p>
                <p className="text-lg mb-1">Status: {match.status}</p>
                <div>
                  <h3 className="font-semibold text-lg">Score</h3>
                  <p>
                    {match.score.fullTime.homeTeam} -{" "}
                    {match.score.fullTime.awayTeam}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brasileiro;
