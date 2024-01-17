import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import { Container } from "@mantine/core";
import es from "../Util/AuthLocalization/es"

function AuthForm() {
  return (
    <Container w={"100vw"} h={"100vh"} style={{
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    }}>

        <div style={{width: "50%"}}>
          <Auth
            localization={{variables: es}}
            supabaseClient={window.supabase}
            appearance={{theme: ThemeSupa}}
            providers={[]}
          />
        </div>
    </Container>
  );
}

export default AuthForm;
