import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {Input} from "@/shared/ui/Input/Input";

const ProfilePage = () => {
    const authData = useSelector(getUserAuthData);

    const onChangeUsername = (value: string) => {

    }

    return (
        <div>
            <h2>Профиль</h2>
            <Input value={authData?.username} onChange={onChangeUsername} />
        </div>
    )
}

export default ProfilePage;
