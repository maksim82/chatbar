import {Suspense, useCallback, memo} from "react";
import {AppRoutesProps, routeConfig} from "../../../../shared/config/routeConfig/routeConfig";
import {PageLoader} from "../../../../widgets/PageLoader/PageLoader";
import {Route, Routes} from "react-router-dom";
import {RequireAuth} from "./RequireAuth";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                <div>
                    {route.element}
                </div>
            </Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        )
    }, [])

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    )
}

export default memo(AppRouter);
