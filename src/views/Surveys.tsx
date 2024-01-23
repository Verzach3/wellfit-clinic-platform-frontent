import {Affix, Button, Modal, ScrollArea, Title} from "@mantine/core";
import SurveysList from "../components/Surveys/SurveysList.tsx";
import {IconCheck, IconPlus} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import SurveyCreate from "../components/Surveys/SurveyCreate.tsx";
import {Survey} from "../types/Survey.ts";
import {useState} from "react";
import {notifications} from "@mantine/notifications";

function Surveys() {

  const [opened, {open, close}] = useDisclosure(false)
  const [name, setName] = useState<string>("")
  const [json, setJson] = useState<string>("")

  async function createSurvey(name: string, json: string) {
    // @ts-expect-error FIXME: Type Survey does not satisfy the constraint never
    const res = await window.supabase.from("surveys").insert<Survey>([
      {
        name: name,
        json: JSON.parse(json),
      }
    ])
    console.log(res)
    if (res.status === 201) {
      notifications.show({
        title: "Encuesta creada",
        message: "La encuesta se ha creado correctamente.",
        color: "green",
        autoClose: 5000,
      })
      close()
    }
  }

  return (
    <div style={{
      overflow: "hidden",
    }}>
      <Modal opened={opened} onClose={close} size={"xl"}>
        <SurveyCreate name={name} setName={setName} json={json} setJson={setJson}/>
      </Modal>
      <div style={{
        marginTop: "2rem",
        marginInline: "2rem"
      }}>
        <Title style={{marginBottom: "1rem"}}>
          Encuestas
        </Title>
        <ScrollArea>
          <SurveysList/>
        </ScrollArea>

        <Affix position={{bottom: 20, right: 20}}>
          {opened ?
            <Button
              onClick={() => createSurvey(name, json)}
              color={"green"}
              rightSection={<IconCheck/>}
            >
              Crear Encuesta
            </Button>
            :
            <Button
              onClick={open}
              rightSection={<IconPlus/>}>
              Nueva Encuesta
            </Button>
          }
        </Affix>
      </div>
    </div>
  );
}

export default Surveys;