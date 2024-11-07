import React from "react";

const GifsGrid = ({
  width,
  height,
  gif,
}: {
  width: number;
  height: number;
  gif: string;
}) => {
  return (
    <div>
      <div>
        <img
          className="m-2 rounded-lg"
          width={width}
          height={height}
          src={gif}
        />
      </div>
    </div>
  );
};

export default GifsGrid;
