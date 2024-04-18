import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "./constants";
import OutputBox from "./OutputBox";
import InputArea from "./InputArea";
import ProblemDescription from "./ProblemDescription";
import { Button, Toast } from "@chakra-ui/react";
import { executeCode } from "./api";
import { useDispatch } from "react-redux";
import { createSubmission } from "../../services/operations/submissionAPI";

const EditorComponent = ({setLightTheme, lightTheme}) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState(localStorage.getItem("code") || CODE_SNIPPETS.cpp);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "cpp");
  const [stdin, setStdin] = useState("");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("Profile"))?.result?._id;
  const problem = "6145d099b9b7f3b177df7b3b";
  const contest = "6145d099b9b7f3b177df7b3b";

  const dispatch = useDispatch();

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    localStorage.setItem("language", language);
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    // console.log(sourceCode);
    if (!sourceCode) return;
    try {
      dispatch(createSubmission(setIsLoading, {user, problem, contest, language,version: LANGUAGE_VERSIONS[language], sourceCode, stdin}))
      //await executeCode(user, problem, contest, language, sourceCode, stdin)
    } catch (error) {
      console.log(error);
      Toast({
        title: "An error occurred.",
        description: error.message || "Unable to run the code",
        status: "error",
        duration: 6000,
      });
    } finally {
      //setIsLoading(false);
    }
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
              <Button
              variant={"outline"}
                colorScheme="green"
                mb={4}
                onClick={runCode}
                isLoading={isLoading}
              >
                Run Code
              </Button>
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
              onMount={onMount}
              value={value}
              onChange={(e) => {
                setValue(e)
                localStorage.setItem("code", value)
              }}
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
