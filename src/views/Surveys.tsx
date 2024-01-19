import {Affix, Button, Text} from "@mantine/core";
import SurveysList from "../components/Surveys/SurveysList.tsx";
import {useEffect} from "react";
import {IconPlus} from "@tabler/icons-react";

function Surveys() {

  useEffect(() => {
    window.supabase.from("surveys").select("*").then((data) => {
      console.log(data)
    })
  }, []);

  return (
    <div style={{
      marginTop: "2rem",
      marginInline: "2rem"
    }}>
      <Text>
        Surveys
      </Text>
      <SurveysList/>

      <Affix position={{bottom: 20, right: 20}}>
        <Button
          rightSection={<IconPlus/>}>
          Crear Encuesta
        </Button>
      </Affix>
    </div>
  );
}

export default Surveys;