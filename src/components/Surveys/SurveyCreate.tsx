import {Input} from "@mantine/core";
import CodeEditor from "@uiw/react-textarea-code-editor";

function SurveyCreate({ name, setName, json, setJson }: { name: string, setName: (name: string) => void, json: string, setJson: (json: string) => void}) {
  return (
    <div>
      <Input.Wrapper label={"Nombre"} error={"Error"}>
      </Input.Wrapper>
      <Input value={name} onChange={(e) => setName(e.target.value)}/>
      <Input.Wrapper error={"Hola"} style={{ marginTop: "1rem"}}>
      </Input.Wrapper>
      <CodeEditor
        value={json}
        language="json"
        placeholder="Pon el JSON de la encuesta aqui."
        onChange={(evn) => setJson(evn.target.value)}
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