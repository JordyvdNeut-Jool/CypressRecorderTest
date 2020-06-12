import * as React from "react";
import Header from "./Header";
import Info from "./Info";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Body from "./Body";
import { RecState, Block, ActionWithPayload } from "../../types";
import { ControlAction } from "../../constants";
import "../../assets/styles/styles.scss";
import Templates from "./Templates";

export default () => {
  const [recStatus, setRecStatus] = React.useState<RecState>("off");
  const [codeBlocks, setCodeBlocks] = React.useState<Block[]>([]);
  const [shouldInfoDisplay, setShouldInfoDisplay] = React.useState<boolean>(
    false
  );
  const [shouldTemplatesDisplay, setShouldTemplatesDisplay] = React.useState<
    boolean
  >(false);
  const [isValidTab, setIsValidTab] = React.useState<boolean>(true);

  const startRecording = (): void => {
    setRecStatus("on");
  };
  const stopRecording = (): void => {
    setRecStatus("paused");
  };
  const resetRecording = (): void => {
    setRecStatus("off");
    setCodeBlocks([]);
  };

  React.useEffect((): void => {
    chrome.storage.local.get(["status", "codeBlocks"], result => {
      if (result.codeBlocks) setCodeBlocks(result.codeBlocks);
      if (result.status === "on") setRecStatus("on");
      else if (result.status === "paused") setRecStatus("paused");
    });
    chrome.tabs.query({ active: true, currentWindow: true }, activeTab => {
      if (activeTab[0].url.startsWith("chrome://")) setIsValidTab(false);
    });
  }, []);

  React.useEffect((): (() => void) => {
    function handleMessageFromBackground({
      type,
      payload
    }: ActionWithPayload): void {
      setShouldInfoDisplay(false);
      setShouldTemplatesDisplay(false);
      if (type === ControlAction.START && isValidTab) startRecording();
      else if (type === ControlAction.STOP) stopRecording();
      else if (type === ControlAction.RESET) resetRecording();
      else if (type === ControlAction.PUSH)
        setCodeBlocks(blocks => [...blocks, payload]);
    }
    chrome.runtime.onMessage.addListener(handleMessageFromBackground);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessageFromBackground);
    };
  }, []);

  const handleToggle = (action: ControlAction): void => {
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
    if (shouldTemplatesDisplay) setShouldTemplatesDisplay(false);
    if (action === ControlAction.START) startRecording();
    else if (action === ControlAction.STOP) stopRecording();
    else if (action === ControlAction.RESET) resetRecording();
    chrome.runtime.sendMessage({ type: action });
  };

  const toggleInfoDisplay = (): void => {
    setShouldInfoDisplay(should => !should);
  };

  const toggleTemplatesDisplay = (): void => {
    setShouldTemplatesDisplay(should => !should);
  };

  const nodeServerPost = async (link, options) => {
    const response = await fetch("http://localhost:3000/" + link, options);
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  const saveTest = async (): Promise<void> => {
    const inputName = document.getElementById("name") as HTMLInputElement;
    const inputDescription = document.getElementById(
      "description"
    ) as HTMLInputElement;
    const inputLocation = document.getElementById(
      "location"
    ) as HTMLInputElement;
    var name = inputName.value;
    var description = inputDescription.value;
    var location = inputLocation.value;

    let toBeSaved: string = "";
    for (let i = 0; i !== codeBlocks.length; i += 1) {
      toBeSaved += "\t\t" + codeBlocks[i].value.concat("\n");
    }
    chrome.storage.local.set(
      { name: name, description: description, code: toBeSaved },
      function () {
        alert("saved successfully!");
      }
    );
    let code = toBeSaved;
    const datas = { name, description, location, code };
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(datas),
    };
    nodeServerPost("saveTest", options);
  };

  const openRunner = async (): Promise<void> => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    };
    nodeServerPost("openRunner", options);
  };

  const runLastRecordedTest = async (): Promise<void> => {
    let code: string = "";
    for (let i = 0; i !== codeBlocks.length; i += 1) {
      code += "\t\t" + codeBlocks[i].value.concat("\n");
    }
    const data = { code };
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    };
    nodeServerPost("openTest", options);
  };

  const copyToClipboard = async (): Promise<void> => {
    try {
      let toBeCopied: string = "";
      for (let i = 0; i !== codeBlocks.length; i += 1) {
        toBeCopied += codeBlocks[i].value.concat("\n");
      }
      await navigator.clipboard.writeText(toBeCopied);
    } catch (error) {
      throw new Error(error);
    }
  };

  const destroyBlock = (index: number): void => {
    setCodeBlocks(prevBlocks => prevBlocks.filter((block, i) => i !== index));
    chrome.runtime.sendMessage({
      type: ControlAction.DELETE,
      payload: index
    });
  };

  const moveBlock = (dragIdx: number, dropIdx: number): void => {
    const temp = [...codeBlocks];
    const dragged = temp.splice(dragIdx, 1)[0];
    temp.splice(dropIdx, 0, dragged);
    setCodeBlocks(temp);
    chrome.runtime.sendMessage({
      type: ControlAction.MOVE,
      payload: { dragIdx, dropIdx }
    });
  };

  return (
    <div id="App">
      <Header
        shouldInfoDisplay={shouldInfoDisplay}
        toggleInfoDisplay={toggleInfoDisplay}
        shouldTemplatesDisplay={shouldTemplatesDisplay}
        toggleTemplatesDisplay={toggleTemplatesDisplay}
      />
      {shouldInfoDisplay ? (
        <Info />
      ) : shouldTemplatesDisplay ? (
        <Templates />
      ) : (
        <Body
          codeBlocks={codeBlocks}
          recStatus={recStatus}
          isValidTab={isValidTab}
          destroyBlock={destroyBlock}
          moveBlock={moveBlock}
        />
      )}
      {recStatus === "paused" &&
        !shouldInfoDisplay &&
        !shouldTemplatesDisplay && (
          <Sidebar
            recStatus={recStatus}
            saveTest={saveTest}
            runLastRecordedTest={runLastRecordedTest}
          />
        )}
      <Footer
        isValidTab={isValidTab}
        recStatus={recStatus}
        handleToggle={handleToggle}
        openRunner={openRunner}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
};
