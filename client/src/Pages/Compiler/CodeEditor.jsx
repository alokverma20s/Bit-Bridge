import React, { useState } from "react";
import EditorComponent from "./EditorComponent";

const CodeEditor = () => {
  const [lightTheme, setLightTheme ] = useState(false);
  return (
    <div className={`min-h-[100vh] ${lightTheme?'':'bg-[#0f0a19]'} px-6 py-20`}>
      <EditorComponent setLightTheme = {setLightTheme} lightTheme= {lightTheme} />
    </div>
  );
};

export default CodeEditor;
