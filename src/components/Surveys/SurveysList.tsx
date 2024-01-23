import {ActionIcon, Button, Center, Group, Modal, Table, Text} from '@mantine/core';
import {useEffect, useState} from "react";
import {Survey} from "../../types/Survey.ts";
import {IconPencil, IconTrash} from "@tabler/icons-react";
import SurveysAnswerViewer from "./SurveysAnswerViewer.tsx";
import {notifications} from "@mantine/notifications";
import {useDisclosure} from "@mantine/hooks";

function SurveysList() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [opened, {open, close}] = useDisclosure(false)
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null)
  useEffect(() => {
    window.supabase.from("surveys").select("id, name").then((response) => {
      console.log(response)
      // @ts-expect-error FIXME: Type Survey does not satisfy the constraint never
      setSurveys(response.data ?? [])
    })
  }, [opened]);

  function deleteSurvey() {
    if (selectedSurvey === null) {
      return;
    }
    window.supabase.from("surveys").delete().eq("id", selectedSurvey.id).then((response) => {
      if (response.status === 200) {
        notifications.show({
          title: "Encuesta eliminada",
          message: "La encuesta se ha eliminado correctamente.",
          color: "green",
          autoClose: 5000,
        })
      }
    })
    close()
  }

  const rows = surveys.map((element) => (
      <Table.Tr key={element.id}>
        <Table.Td>
          <Center>
            <Text fw={600}>
              {element.name}
            </Text>
          </Center>
        </Table.Td>
        <Table.Td>
          <Center>
            <a href={`https://platform.wellfitclinic.com/surveys/${element.id}`}>{element.id}</a>
          </Center>
        </Table.Td>
        <Table.Td>
          <Center>
            <SurveysAnswerViewer id={element.id}/>
          </Center>
        </Table.Td>
        <Table.Td>
          <Center>
            <ActionIcon variant="light" radius={0}>
              <IconPencil/>
            </ActionIcon>
            <ActionIcon variant="light" radius={0} color={"red"}>
              <IconTrash onClick={() => {
                setSelectedSurvey(element)
                open()
              }}/>
            </ActionIcon>
          </Center>
        </Table.Td>
      </Table.Tr>
    ))
  ;

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Text size={"lg"} ta={"center"}>
          Seguro que quieres eliminar la encuesta:
        </Text>
        <Text fw={600} size={"lg"} ta={"center"} style={{marginBottom: "1rem"}}>
          {selectedSurvey?.name}
        </Text>
        <Center>
          <Group>
            <Button onClick={close}>
              Cancelar
            </Button>
            <Button color={"red"} onClick={deleteSurvey}>
              Si, Eliminar
            </Button>
          </Group>
        </Center>
      </Modal>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Center>
                Titulo
              </Center>
            </Table.Th>
            <Table.Th>
              <Center>
                Link
              </Center>
            </Table.Th>
            <Table.Th>
              <Center>
                Respuestas
              </Center>
            </Table.Th>
            <Table.Th>
              <Center>
                Acciones
              </Center>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows}
        </Table.Tbody>
      </Table>
    </>
  );
}

export default SurveysList