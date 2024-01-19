import {ActionIcon, Center, Table, Text} from '@mantine/core';
import {useEffect, useState} from "react";
import {Survey} from "../../types/Survey.ts";
import {IconPencil, IconTrash} from "@tabler/icons-react";
import SurveysAnswerViewer from "./SurveysAnswerViewer.tsx";

function SurveysList() {
  const [surveys, setSurvey] = useState<Survey[]>([]);

  useEffect(() => {
    window.supabase.from("surveys").select("*").then((response) => {
      console.log(response)
      setSurvey(response.data ?? [])
    })
  }, []);
  const rows = surveys.map((element) => (
      <Table.Tr key={element.name}>
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
              <IconTrash/>
            </ActionIcon>
          </Center>
        </Table.Td>
      </Table.Tr>
    ))
  ;

  return (
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
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default SurveysList