import React from "react";
import { Link } from "react-router-dom";

interface Props {
  hasLink?: boolean;
}

const BrandTitle = ({ hasLink = true }: Props) => {
  const Component = hasLink ? Link : React.Fragment;

  return (
    <Component to={"/"}>
      <strong className="font-bold text-3xl text-blue-500">مسکینو</strong>
    </Component>
  );
};

export default BrandTitle;
