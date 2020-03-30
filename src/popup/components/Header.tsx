import * as React from 'react';
import InfoButton from './InfoButton';
import TemplatesButton from "./TemplatesButton";

export interface HeaderProps {
  toggleInfoDisplay: () => void;
  shouldInfoDisplay: boolean;
  toggleTemplatesDisplay: () => void;
  shouldTemplatesDisplay: boolean;
}

export default ({
  shouldInfoDisplay,
  toggleInfoDisplay,
  shouldTemplatesDisplay,
  toggleTemplatesDisplay
}: HeaderProps) => (
  <div id="header">
    <h1 id="title">Cypress Recorder</h1>
    <InfoButton
      shouldInfoDisplay={shouldInfoDisplay}
      toggleInfoDisplay={toggleInfoDisplay}
    />
    <TemplatesButton
      shouldTemplatesDisplay={shouldTemplatesDisplay}
      toggleTemplatesDisplay={toggleTemplatesDisplay}
    />
  </div>
);
