import Link from "next/link";
import React from "react";

const GifsGrid = ({
  width,
  height,
  gif,
  slug,
}: {
  width: number;
  height: number;
  gif: string;
  slug: string;
}) => {
  return (
    <div>
      <Link href={`/gif/${slug}`}>
      <div>
        <img
          className="m-2 rounded-lg"
          width={width}
          height={height}
          src={gif}
          />
      </div>
          </Link>
    </div>
  );
};

export default GifsGrid;
