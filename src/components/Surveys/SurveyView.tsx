import {useParams} from "react-router-dom";
import "survey-core/defaultV2.css";
import {BorderlessLight} from "survey-core/themes"
import {CompleteEvent, Model} from "survey-core";
import {useCallback, useEffect, useState} from "react";
import {Loader} from "@mantine/core";
import {Survey as SurveyComp} from "survey-react-ui";
import {Survey} from "../../types/Survey.ts";

function SurveyView() {
  const params = useParams();
  const [surveyModel, setSurveyModel] = useState<Model | null>(null);

  const surveyComplete = useCallback((sender: Model, options: CompleteEvent) => {
    options.showSaveInProgress();
    (async () => {
      try {
        // @ts-expect-error FIXME: Type Survey does not satisfy the constraint never
        await window.supabase.from("surveys_answers").insert([
          {
            survey: params.id,
            answer: sender.data,
            respondent: (await window.supabase.auth.getUser()).data.user?.id
          }
        ])
        options.showDataSavingSuccess()
      } catch (err) {
        options.showDataSavingError()
      }
    })()
  }, [params.id])

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

  surveyModel?.onComplete.add(surveyComplete)

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