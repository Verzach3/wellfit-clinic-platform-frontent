import {ActionIcon, Table} from '@mantine/core';
import {useEffect, useState} from "react";
import {Survey} from "../../types/Survey.ts";
import {IconPencil, IconTrash} from "@tabler/icons-react";

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
      {element.name}</Table.Td>
      <Table.Td>
        <a href={`https://platform.wellfitclinic.com/surveys/${element.id}`}>{element.id}</a>
      </Table.Td>
      <Table.Td>
        <ActionIcon>
          <IconPencil/>
        </ActionIcon>
        <ActionIcon color={"red"}>
          <IconTrash/>
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Titulo</Table.Th>
          <Table.Th>Link</Table.Th>
          <Table.Th>Acciones</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
export default SurveysList