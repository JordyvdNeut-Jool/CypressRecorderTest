import * as React from "react";

export interface TemplateBlockProps {
  name: string;
}

export default ({ name }: TemplateBlockProps) => {

  const handleClick = (key, id): void => {
    let codeRow = `<h2>` + key + `</h2>`;
    codeRow += `<textarea>{Code}</textarea>`;
    document.getElementById("code").innerHTML = codeRow;
  };
  
  return (
    <div className="template">
      <div>
      <span>
        <button onClick={handleClick.bind(this, name)}>{name}</button>
      </span>
      </div>
      <div id='code'></div>
    </div>
    
  );
};
