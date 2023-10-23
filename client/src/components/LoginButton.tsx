import { useAuth0 } from "@auth0/auth0-react";
import { UserAuthButton } from "./StyledComponents";

export default function LoginButton() {

    const { loginWithRedirect } = useAuth0();
return <UserAuthButton onClick={() => loginWithRedirect()}>Login</UserAuthButton>;
}
