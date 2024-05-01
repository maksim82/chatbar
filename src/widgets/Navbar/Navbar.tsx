import {memo, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "../../shared/ui/Button/Button";
import {LoginModal} from "../../features/AuthByUsername/ui/LoginModal/LoginModal";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, [])

    const onOpenModal = useCallback(() => {
        setIsAuthModal(true);
    }, [])

    return (
        <div>
            <Button
                onClick={onOpenModal}
            >
                { t("ENTER") }
            </Button>
            {
                isAuthModal && (
                    <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
                )
            }
        </div>
    )
})
