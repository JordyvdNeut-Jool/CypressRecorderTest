import * as React from "react";

const chr = chrome.extension.getBackgroundPage();

export default () => {

  const nodeServerPost = async (link, options) => {
    const response = await fetch("http://localhost:3000/" + link, options);
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  const readTest = async (): Promise<any[]> => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8"
      }
    };
    var response = nodeServerPost("readTests", options);

    var fileName = response.then(result => {
      let values = Object.values(result);
      return values;
    });
    return fileName;
  };
  const pushTemplateName = () => {
      readTest().then(result => {
        result.forEach(element => {
          element.forEach(fileName => {
            var fileNameRow = "<button onClick={handleClick}>" + fileName + "</button>";
            document.getElementById("test").innerHTML += fileNameRow;
          });
        });
      });
  };

  const handleClick = () => {
    // try {
      var codeRow = "<textarea>Text</textarea>";
      document.getElementById("code").innerHTML += codeRow;
          // } catch (error) {
      // throw new Error(error);
    // }
  };

  return (
    <div id="templatesbox">
      <h1>Templates</h1>
      {pushTemplateName()}
      <div id="test"></div>
      <div id="code"></div>
      <br />
    </div>
  );
};
