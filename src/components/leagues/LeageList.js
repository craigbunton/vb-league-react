import React, { useEffect, useContext } from "react";
import LeagueItem from "./LeagueItem";
import LeagueContext from "../../context/leagues/leagueContext";

//Return a list of Leagues, showing Active and Completed
// as different text colours, Active ones on the top in
// start date order, completed ones in a different panel
// in completed date order. A Button to add a new league.

const LeageList = () => {
  const leagueContext = useContext(LeagueContext);
  const { leagues, loading, getLeagues } = leagueContext;
  console.log("leagues at start of LeageList: ", leagues);

  useEffect(() => {
    getLeagues();
    // eslint-disable-next-line
  }, []);

  console.log("leagues after useEffect: ", leagues);

  if (leagues === null && loading !== true) {
    return <h4>No leagues in the database</h4>;
  }
  // if (leagues !== null && leagues.length === 0 && !loading) {
  //   return <h4>No leagues in the database!</h4>;
  // }

  return (
    <div>
      <h5>League List</h5>
      <ul className="collection">
        {!loading &&
          leagues !== null &&
          leagues.map(l => <LeagueItem league={l} key={l.id} />)}
      </ul>
    </div>
  );
};

export default LeageList;
