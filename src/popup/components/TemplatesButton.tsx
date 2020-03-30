import * as React from 'react';

export interface TemplatesButtonProps {
  toggleTemplatesDisplay: () => void;
  shouldTemplatesDisplay: boolean;
}

export default ({ shouldTemplatesDisplay, toggleTemplatesDisplay }: TemplatesButtonProps) => {
  const handleClick = (): void => {
    toggleTemplatesDisplay();
  };
  return (
    <>
      <button type="button" className="button" onClick={handleClick}>
        {shouldTemplatesDisplay ? 'Recording Menu' : 'Templates'}
      </button>
    </>
  );
};
