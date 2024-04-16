import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./constants";
import OutputBox from "./OutputBox";
import InputArea from "./InputArea";
import ProblemDescription from "./ProblemDescription";

const EditorComponent = ({setLightTheme, lightTheme}) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [stdin, setStdin] = useState("");
  const [editorTheme, setEditorTheme] = useState("vs-dark");

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div>
      <div className=" flex lg:space-x-4 flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 overflow-scroll h-[81vh] border p-3 border-gray-600 rounded-md">
          <ProblemDescription/>
        </div>
          <div className="text-2xl w-full lg:w-1/2">
            <div className=" flex justify-between items-center">
              <LanguageSelector language={language} onSelect={onSelect} lightTheme= {lightTheme} />
              <div className="p-3 border border-gray-500 rounded-lg" onClick={()=>{
                setEditorTheme(editorTheme === 'vs-dark'? 'light': 'vs-dark');
                setLightTheme(!lightTheme)
              }}>
                {editorTheme === 'vs-dark'? <MdLightMode className="text-2xl text-gray-400" />: <MdDarkMode className="text-2xl text-gray-900" />}
              </div>
            </div>
            <Editor
              className="border border-gray-600 h-[60vh] lg:h-[70vh]"
              // height="75vh"
              theme= {editorTheme}
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(e) => setValue(e)}
            />
          </div>
        {/* <div className=" w-full lg:w-1/2">
        <OutputBox editorRef={editorRef} language={language} stdin={stdin} lightTheme= {lightTheme} />
          <div>
            <InputArea stdin={stdin} setStdin= {setStdin} lightTheme = {lightTheme} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default EditorComponent;
