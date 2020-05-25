import * as React from "react";
import { useEffect } from "react";
import TemplateBlock from "./TemplateBlock";

export default () => {
  const nodeServerPost = async (link, options) => {
    const response = await fetch("http://localhost:3000/" + link, options);
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  const readTests = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    };
    var response = nodeServerPost("readTests", options);
    var results = response.then((result) => {
      return Object.values(result);
    });
    return results;
  };

  const templateNames = async() => await readTests().then((result) => {
    result.map((files: any[]) => {
      files.map((templateName: string) => {
        <TemplateBlock name={templateName}/>
      });
    });
  });

  return (
    <div id="templatesbox">
      <h1>Templates</h1>
      <TemplateBlock name={'RecentTest'} />
      {/* {templateNames} */}
      <br />
    </div>
  );
};
