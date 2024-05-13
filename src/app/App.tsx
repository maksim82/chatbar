import {BugButton} from "@/app/providers/ErrorBoundary/ui/BugButton";
import {Navbar} from "@/widgets/Navbar/Navbar";
import {useTheme} from "@/app/providers/ThemeProvider";
import {useDispatch, useSelector} from "react-redux";
import {getUserInited} from "@/entities/User/model/selectors/getUserInited/getUserInited";
import {Suspense, useEffect} from "react";
import {userActions} from "@/entities/User";
import {classNames} from "@/shared/lib/classNames/classNames";
import {AppRouter} from "@/app/providers/router";
import {Sidebar} from "@/widgets/Sidebar";

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
      dispatch(userActions.initAuthData());
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [theme])}>
        <Navbar />
        <div className="content-page">
            <Sidebar />
            <div>
                { inited && <AppRouter /> }
                <BugButton />
            </div>
        </div>
    </div>
  )
}

export default App
