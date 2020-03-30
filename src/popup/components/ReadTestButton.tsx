import * as React from "react";

export interface ReadTestButtonProps {
  readTest: () => Promise<any>;
}

const chr = chrome.extension.getBackgroundPage();

export default ({ readTest }: ReadTestButtonProps) => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const handleClick = async (): Promise<void> => {
    try {
      await readTest();
      readTest().then(result => {
        result.forEach(element => {
          chr.console.log(element);
          element.forEach(fileName => {
            document.getElementById("tests").innerHTML += fileName;
            chr.console.log(fileName);            
          });
        });
      });
      setSuccess(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div id="read-wrap">
      <span id="tests"></span>
      <button type="button" id="read" className="button" onClick={handleClick}>
        Test
      </button>
    </div>
  );
};
