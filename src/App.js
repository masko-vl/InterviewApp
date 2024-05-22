import "./App.css";
import NavBar from "./pages/NavBar";
import { CamaraResults } from "./pages/CamaraResults";
import {Layout} from "./components/StyledComponents/Layout";
import { GasDataProvider } from "./context/GasDataImagesContext";

const App = () => {

  return (
    <GasDataProvider>
      <Layout>
        <NavBar />
        <CamaraResults />
      </Layout>
    </GasDataProvider>
  );
}

export default App;
