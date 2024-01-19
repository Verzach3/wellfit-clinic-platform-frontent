import {useParams} from "react-router-dom";
import "survey-core/defaultV2.css";
import {BorderlessLight} from "survey-core/themes"
import {Model} from "survey-core";
import {useCallback, useEffect, useState} from "react";
import {Loader} from "@mantine/core";
import {Survey as SurveyComp} from "survey-react-ui";
import {Survey} from "../../types/Survey.ts";

function SurveyView() {
  const params = useParams();
  const [surveyModel, setSurveyModel] = useState<Model | null>(null);

  useEffect(() => {
    window.supabase.from("surveys").select("*").eq("id", params.id ?? "").then((response) => {
      if (!response.data || response.data.length === 0) {
        return;
      }
      const survey = response.data[0] as Survey;
      const surveyModel = new Model(survey.json);
      surveyModel.applyTheme(BorderlessLight);
      setSurveyModel(surveyModel);

    })
  }, [params.id]);

  const surveyComplete = useCallback((sender: Model) => {
    console.log(sender)
  }, [])

  surveyModel?.onComplete.add(surveyComplete);

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
      <SurveyComp model={surveyModel}/>
    </div>
  );
}

export default SurveyView;