import {memo, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "../../shared/ui/Button/Button";
import {LoginModal} from "../../features/AuthByUsername/ui/LoginModal/LoginModal";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData, userActions} from "@/entities/User";
import cls from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, [])

    const onOpenModal = useCallback(() => {
        setIsAuthModal(true);
    }, [])

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch])

    if (authData) {
        return (
            <div className={cls.Navbar}>
                <div className={cls.title}>ЧатБар</div>
                <Button
                    className={cls.btn}
                    theme={ButtonTheme.CLEAR_INVERTED}
                    onClick={onLogout}
                >
                    Выйти
                </Button>
            </div>
        )
    }

    return (
        <div className={cls.Navbar}>
            <div className={cls.title}>ЧатБар</div>
            <Button
                className={cls.btn}
                onClick={onOpenModal}
            >
                Войти
            </Button>
            {
                isAuthModal && (
                    <LoginModal
                        isOpen={isAuthModal}
                        onClose={onCloseModal}
                    />
                )
            }
        </div>
    )
})
