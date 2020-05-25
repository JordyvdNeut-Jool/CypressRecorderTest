import * as React from 'react';
import ToggleButton from './ToggleButton';
import ResetButton from './ResetButton';
import OpenRunnerButton from "./OpenRunnerButton";
import ClipboardButton from './ClipboardButton';
import { ControlAction } from '../../constants';

export interface FooterProps {
  isValidTab: boolean;
  recStatus: string;
  handleToggle: (action: ControlAction) => void;
  openRunner: () => Promise<void>;
  copyToClipboard: () => Promise<void>;
}

export default ({
  isValidTab,
  recStatus,
  handleToggle,
  openRunner,
  copyToClipboard
}: FooterProps) => (
  <div id="footer">
    <ToggleButton
      recStatus={recStatus}
      handleToggle={handleToggle}
      isValidTab={isValidTab}
    />
    {recStatus === "paused" && <ResetButton handleToggle={handleToggle} />}
    {recStatus === "paused" && <OpenRunnerButton openRunner={openRunner} />}
    {recStatus === "paused" && (
      <ClipboardButton copyToClipboard={copyToClipboard} />
    )}
  </div>
);
