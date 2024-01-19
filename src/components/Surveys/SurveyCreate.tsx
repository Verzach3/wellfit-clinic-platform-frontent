import {Input} from "@mantine/core";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {useState} from "react";

function SurveyCreate() {
  const [code, setCode] = useState(``);
  return (
    <div>
      <Input.Wrapper label={"Nombre"} error={"Error"}>
      </Input.Wrapper>
      <Input/>
      <Input.Wrapper error={"Hola"} style={{ marginTop: "1rem"}}>
      </Input.Wrapper>
      <CodeEditor
        value={code}
        language="json"
        placeholder="Pon el JSON de la encuesta aqui."
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </div>
  )
}

export default SurveyCreate