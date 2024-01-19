import {ActionIcon, Loader, Text} from "@mantine/core";
import {IconEye} from "@tabler/icons-react";
import {useState} from "react";

function SurveysAnswerViewer({id}: { id: string }) {
  const [responsesAmount, setResponsesAmount] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  async function getAnswersAmount() {
    setLoading(true)
    const {data, error} = await window.supabase
      .from("surveys_answers")
      .select("*")
      .eq("survey", id)
    console.log(data)
    console.log(error)
    if (error) {
      return;
    }
    setResponsesAmount(data?.length ?? 0)
    setLoading(false)
  }

  if (loading) {
    console.log("loading")
    return (
      <Loader size={"xs"} type={"bars"}/>
    )
  } else if (responsesAmount === null) {
    return (
      <ActionIcon variant={"light"} onClick={getAnswersAmount}>
        <IconEye/>
      </ActionIcon>
    )
  }

  return (
    <Text fw={600}>
      {responsesAmount}
    </Text>
  )
}

export default SurveysAnswerViewer;