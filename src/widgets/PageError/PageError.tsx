import {useTranslation} from "react-i18next";
import {classNames} from "../../shared/lib/classNames/classNames";
import cls from "./PageError.module.scss";
import {Text} from "../../shared/ui/Text/Text";
import {Button} from "../../shared/ui/Button/Button";

interface PageErrorProps {
    className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        location.reload();
    }

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <Text>{ t("UNEXPECTED_ERROR") }</Text>
            <Button
                onClick={reloadPage}
            >
                {t("RELOAD_PAGE")}
            </Button>
        </div>
    )
}

