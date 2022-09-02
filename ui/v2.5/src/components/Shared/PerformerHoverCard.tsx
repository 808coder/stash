import React from "react";
import { Link } from "react-router-dom";
import * as GQL from "src/core/generated-graphql";
import { TagLink } from "./TagLink";

interface IProps {
  performer: GQL.Performer;
  displayTagLink: boolean;
}

export const PerformerHoverCard: React.FC<IProps> = ({
  performer,
  displayTagLink,
}) => (
  <div className="performer-tag-container row" key={performer.id}>
    <Link
      to={`/performers/${performer.id}`}
      className="performer-tag col m-auto zoom-2"
    >
      <img
        className="image-thumbnail"
        alt={performer.name ?? ""}
        src={performer.image_path ?? ""}
      />
    </Link>
    {displayTagLink ? (
      <TagLink key={performer.id} performer={performer} className="d-block" />
    ) : undefined}
  </div>
);
