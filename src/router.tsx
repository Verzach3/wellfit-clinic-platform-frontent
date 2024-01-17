import {createBrowserRouter} from "react-router-dom";
import AuthForm from "./views/Auth";
import Layout from "./views/Layout.tsx";
import AuthScript from "./Util/AuthScript";
import Surveys from "./views/Surveys.tsx";
import Dash from "./views/Dash.tsx";
import SurveyView from "./components/Surveys/SurveyView.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthScript/>,
    children: [
      {
        path: "/",
        element: <Layout/>,
        children: [
          {
            path: "/",
            element: <Dash/>
          },
          {
            path: "/surveys",
            element: <Surveys/>
          }
        ]
      },
      {
        path: "/auth",
        element: <AuthForm/>,
      },
      {
        path: "/surveys/:id",
        element: <SurveyView/>,
      }
    ],
  },
]);
