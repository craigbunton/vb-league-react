import React, { useEffect, useContext } from "react";
import PlayerItem from "../../components/players/PlayerItem";
import PlayerContext from "../../context/player/playerContext";

const PlayerList = () => {
  const playerContext = useContext(PlayerContext);
  const { players, loading, getPlayers } = playerContext;

  useEffect(() => {
    getPlayers();
    // eslint-disable-next-line
  }, []);

  if (players !== null && players.length === 0 && !loading) {
    return <h4>No players in the database</h4>;
  }

  return (
    <div>
      <h2>Player List</h2>
      <ul className="collection">
        {!loading &&
          players !== null &&
          players.map(player => <PlayerItem player={player} key={player.id} />)}
      </ul>
    </div>
  );
};

export default PlayerList;
