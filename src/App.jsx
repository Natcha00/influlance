import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/influencer/authen/RegisterPage";
import ProfileInfomationPage from "./pages/influencer/authen/ProfileInfomationPage";
import AddYourPortfolioPage from "./pages/influencer/authen/AddYourPortfolioPage";
import ProfilePage from "./pages/influencer/profile/ProfilePage";
import ContentFeedPage from "./pages/influencer/content/ContentFeedPage";
import SearchWorkPage from "./pages/influencer/content/SearchWorkPage";
import WorkSpacePage from "./pages/influencer/work/WorkSpacePage";
import WorkDraftPage from "./pages/influencer/work/WorkDraftPage";
import FinanceManagementPage from "./pages/influencer/finance/FinanceManagementPage";
import LoginPage from "./pages/influencer/authen/LoginPage";
import Navbar from "./components/Navbar";
import AppLayout from "./components/AppLayout";
import { Button, ConfigProvider } from "antd";
import MainHomePage from "./pages/mainHomePage";
import InfluencerHomePage from "./pages/influencer/home/InfluencerHomePage";
import MarketerHomePage from "./pages/marketer/home/MarketerHomePage";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7367F0",
            colorText: "#fff",
          },
          components: {
            Collapse: {
              colorFillAlter: "#7367F0",
              colorBgContainer: "#000", //check
            },
            Layout: {
              bodyBg: "#000",
              headerColor: "#fff",
            },
            Divider: {
              colorTextHeading: "#000",
            },
            Card: {
              headerBg: "linear-gradient(to right, #7367F0, #A582F7, #CE9FFC)",
              colorBgContainer: "#fff",
              colorText: "#000",
            },
            Modal: {
              titleColor: "#000",
            },
            Popconfirm: {
              colorTextHeading: "#000",
            },
            Button: {
              colorText: "#7367F0",
            },
            Tag: {
              defaultColor: "#000",
            },
            Form: {
              labelColor: "#000",
              handleHoverColor: "#000",
            },
            Input: {
              colorText: "#000",
            },
            InputNumber: {
              colorText: "#000",
              // colorFillSecondary:'#000'
            },
            Select: {
              colorText: "#000",
            },
            Table: {
              headerColor: "#000",
              colorText: "#000",
            },
            Divider: {
              colorSplit: "#fff",
            },
          },
        }}
      >
        <Navbar />
        <AppLayout>
          <Routes>
            <Route path="/" element={<MainHomePage />} />
            <Route path="/influencer-homepage" element={<InfluencerHomePage />} />
            <Route path="/marketer-homepage" element={<MarketerHomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/profile-information"
              element={<ProfileInfomationPage />}
            />
            <Route
              path="/add-your-portfolio"
              element={<AddYourPortfolioPage />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/content-feed" element={<ContentFeedPage />} />
            <Route path="/search" element={<SearchWorkPage />} />
            <Route path="/work-space" element={<WorkSpacePage />} />
            <Route path="/work-darft" element={<WorkDraftPage />} />
            <Route path="/finance" element={<FinanceManagementPage />} />
          </Routes>
        </AppLayout>
      </ConfigProvider>
    </>
  );
}

export default App;
