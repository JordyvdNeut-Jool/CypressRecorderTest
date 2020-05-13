import * as React from "react";
import { useEffect } from "react";
import TemplateBlock from "./TemplateBlock";

const chr = chrome.extension.getBackgroundPage();

export default () => {
  const nodeServerPost = async (link, options) => {
    const response = await fetch("http://localhost:3000/" + link, options);
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  const readTests = async (): Promise<any[]> => {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    };
    var response = await nodeServerPost("readTests", options);
    var files = await response.then(async (result) => {
      chr.console.log("result: ", result);
      return Object.values(result);
    });
    chr.console.log("files: ", files);
    return files;
  };

  const templateNames = async () => {
    await readTests().then((result) => {
      result.map((files: any[]) => {
        files.map((template: string) => {
          <TemplateBlock name={template} />;
        });
      });
    });
  };

  return (
    <div id="templatesbox">
      <h1>Templates</h1>
      <TemplateBlock name={"template"} />
      <ul id="template-display">{templateNames}</ul>
      <br />
    </div>
  );
};
