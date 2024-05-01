import { Button } from "../../../../shared/ui/Button/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const BugButton = () => {
    const [error, setError] = useState(false);
    const { t } = useTranslation("main");

    useEffect(() => {
        if (error) {
            throw new Error()
        }
    }, [error])

    const onThrow = () => setError(true);

    return (
        <Button
            onClick={onThrow}
        >
            {t("CREATE_ERROR")}
        </Button>
    )
}
