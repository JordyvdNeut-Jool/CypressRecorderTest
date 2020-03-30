import * as React from "react";

export interface RunTestButtonProps {
  runLastRecordedTest: () => Promise<void>;
}

export default ({ runLastRecordedTest }: RunTestButtonProps) => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const handleClick = async (): Promise<void> => {
    try {
      await runLastRecordedTest();
      setSuccess(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div id="run-wrap">
      <button type="button" id="run" className="button" onClick={handleClick}>
        {success ? "Running!" : "Run Test"}
      </button>
    </div>
  );
};
