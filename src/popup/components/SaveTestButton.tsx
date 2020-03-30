import * as React from 'react';

export interface SaveTestButtonProps {
  saveTest: () => Promise<void>,
}

export default ({ saveTest }: SaveTestButtonProps) => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const handleClick = async (): Promise<void> => {
    try {
      await saveTest();
      setSuccess(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div id="save-wrap">
      <button type="button" id="save" className="button" onClick={handleClick}>
        {success ? 'Saved!' : 'Save Test'}
      </button>
    </div>
  );
};
