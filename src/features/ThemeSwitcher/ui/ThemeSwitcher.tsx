import {Theme, useTheme} from "../../../app/providers/ThemeProvider";
import {Button, ButtonTheme} from "../../../shared/ui/Button/Button";
import {classNames} from "../../../shared/lib/classNames/classNames";

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = (({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            { theme === Theme.DARK ? "Темный" : "Светлый" }
        </Button>
    )
})
