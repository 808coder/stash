import React from "react";
import { Link } from "react-router-dom";
import * as GQL from "src/core/generated-graphql";
import { sortPerformers } from "src/core/performers";
import { HoverPopover } from "./HoverPopover";

interface IProps {
  performers: GQL.Performer[];
  onlyFemale?: boolean;
  displayThumbnailOnHover?: boolean;
}

export const PerformerEnumeration: React.FC<IProps> = ({
  performers,
  onlyFemale,
  displayThumbnailOnHover,
}) => {
  const performerSource = onlyFemale
    ? performers.filter(
        (performer) => performer.gender === GQL.GenderEnum.Female
      )
    : performers;

  const sortedPerformers = sortPerformers(performerSource);

  function renderPerformerThumbnail(performer: GQL.Performer) {
    return (
      <Link to={`/performers/${performer.id}`} className="performer-tag">
        <img
          className="image-thumbnail"
          alt={performer.name ?? ""}
          src={performer.image_path ?? ""}
        />
      </Link>
    );
  }

  function renderPerformerNameAsLink(performer: GQL.Performer) {
    return (
      <Link className="font-weight-bold" to={`/performers/${performer.id}`}>
        {performer.name}
      </Link>
    );
  }

  function renderPerformerNameAsThumbnail(performer: GQL.Performer) {
    return (
      <HoverPopover
        leaveDelay={0}
        placement="bottom"
        className="d-inline"
        content={renderPerformerThumbnail(performer)}
      >
        {renderPerformerNameAsLink(performer)}
      </HoverPopover>
    );
  }

  return (
    <span>
      with{" "}
      {sortedPerformers.map((performer, index) => (
        <>
          {!displayThumbnailOnHover || !performer.image_path
            ? renderPerformerNameAsLink(performer)
            : renderPerformerNameAsThumbnail(performer)}
          {index + 1 < sortedPerformers.length ? ", " : undefined}
        </>
      ))}
    </span>
  );
};
