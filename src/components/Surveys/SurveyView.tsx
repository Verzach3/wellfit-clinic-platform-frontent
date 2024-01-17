import {useParams} from "react-router-dom";
import "survey-core/defaultV2.css"
import { BorderlessLight } from "survey-core/themes"
import {Model} from "survey-core";
import {useEffect, useState} from "react";
import {Loader} from "@mantine/core";
import {Survey} from "survey-react-ui";

function SurveyView() {
  const params = useParams();
  const [surveyModel, setSurveyModel] = useState<Model | null>(null);

  useEffect(() => {
    window.supabase.from("surveys").select("*").eq("id", params.id ?? "").then((response) => {
      if (!response.data || response.data.length === 0) {
        return;
      }

      const survey = response.data[0];
      const surveyModel = new Model(survey.json);
      surveyModel.applyTheme(BorderlessLight);
      setSurveyModel(surveyModel);

    })
  }, [params.id]);

  if (surveyModel === null) {
    return (
      <div style={{
        width: "100vw", height: "100vh", display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Loader type={"bars"} size={"xl"}/>
      </div>
    )
  }
  return (
    <div style={{
      width: "100vw", height: "100vh", display: "flex",
    }}>
      <Survey model={surveyModel}/>
    </div>
  );
}

export default SurveyView;