import "./App.css";
import NavBar from "./pages/NavBar";
import {Layout} from "./components/StyledComponents/Layout";
import { GasDataProvider } from "./context/GasDataImagesContext";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./components/ErrorFallback"

const Home = lazy(() => import("./pages/Home/index"));
const CamaraResults = lazy(() => import("./pages/CamaraResults/index"));
const Account = lazy(() => import("./pages/Account/index"));
const Settings = lazy(() => import("./pages/Settings"))

const App = () => {

  return (
    <GasDataProvider> 
      <Layout>
        <NavBar />
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
                // log the error
				        console.log("Error caught!") }}
          >
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camara" element={<CamaraResults />} />
            <Route path="/account" element={<Account />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<p>PAGE NOT FOUND</p>} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </Layout>
    </GasDataProvider>
  );
}

export default App;
