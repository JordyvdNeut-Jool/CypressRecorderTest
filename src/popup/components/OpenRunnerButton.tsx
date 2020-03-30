import * as React from "react";

export interface OpenRunnerButtonProps {
  openRunner: () => Promise<void>;
}

export default ({ openRunner }: OpenRunnerButtonProps) => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const handleClick = async (): Promise<void> => {
    try {
      await openRunner();
      setSuccess(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div id="open-wrap">
      <button type="button" id="openRunner" className="button" onClick={handleClick}>
        {success ? "Starting!" : "Open Runner"}
      </button>
    </div>
  );
};
