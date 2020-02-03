import React from "react";

const PlayerItem = ({ player }) => {
  const { playerName, firstName, lastName } = player;
  return (
    <li className="collection-item">
      <div>
        {playerName} : {firstName} {lastName}
      </div>
    </li>
  );
};

export default PlayerItem;
