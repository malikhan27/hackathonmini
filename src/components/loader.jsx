import { useState } from "react";
import { BeatLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

export default function Loader({size}) {
  const [loading] = useState(true);
  const [color] = useState("#38bdf8"); // sky blue for visibility on white

  return (
    <span className="sweet-loading">
      <BeatLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </span>
  );
}
