import { useAuth0 } from "@auth0/auth0-react";
import { UserAuthButton } from "./StyledComponents";

export default function LogoutButton() {
    const { logout } = useAuth0();

    return <UserAuthButton onClick={() => logout()}>Logout</UserAuthButton>;
}
