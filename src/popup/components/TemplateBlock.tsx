import * as React from "react";

const chr = chrome.extension.getBackgroundPage();

export interface TemplateBlockProps {
  name: string;
}

export default ({ name }: TemplateBlockProps) => {
  const handleClick = (key, id): void => {
    let codeRow = `<textarea>` + key + `</textarea>`;
    document.getElementById("code").innerHTML = codeRow;
  };
  
  return (
    <li>
      <span>
        <button onClick={handleClick.bind(this, name)}>{name}</button>
      </span>
      <div id='code'></div>
    </li>
    
  );
};
