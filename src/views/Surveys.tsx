import {Text} from "@mantine/core";
import SurveysList from "../components/Surveys/SurveysList.tsx";
import {useEffect} from "react";

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
    </div>
  );
}

export default Surveys;