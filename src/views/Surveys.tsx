import {Affix, Button, Modal, Title} from "@mantine/core";
import SurveysList from "../components/Surveys/SurveysList.tsx";
import {IconCheck, IconPlus} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import SurveyCreate from "../components/Surveys/SurveyCreate.tsx";

function Surveys() {

  const [opened, {open, close}] = useDisclosure(false)

  return (
    <>
      <Modal opened={opened} onClose={close} size={"xl"}>
        <SurveyCreate/>
      </Modal>
      <div style={{
        marginTop: "2rem",
        marginInline: "2rem"
      }}>
        <Title style={{ marginBottom: "1rem"}}>
          Encuestas
        </Title>
        <SurveysList/>

        <Affix position={{bottom: 20, right: 20}}>
          {opened ?
            <Button
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
    </>
  );
}

export default Surveys;