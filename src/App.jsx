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
import ProtectedNoAuthRoute from "./components/ProtectedNoAuthRoute";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute";
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
            <Route path="/register" element={
              <ProtectedNoAuthRoute>
                <RegisterPage />
              </ProtectedNoAuthRoute>
            } />
            <Route path="/login" element={
              <ProtectedNoAuthRoute>
                <LoginPage />
              </ProtectedNoAuthRoute>
            } />
            <Route path="/" element={<MainHomePage />} />
            <Route path="/influencer-homepage" element={<InfluencerHomePage />} />
            <Route path="/marketer-homepage" element={<MarketerHomePage />} />
            <Route
              path="/profile-information"
              element={
                <ProtectedAuthRoute>
                  <ProfileInfomationPage />
                </ProtectedAuthRoute>
              }
            />
            <Route
              path="/add-your-portfolio"
              element={
                <ProtectedAuthRoute>
                  <AddYourPortfolioPage />
                </ProtectedAuthRoute>
              }
            />
            <Route path="/profile" element={
              <ProtectedAuthRoute>
                <ProfilePage />
              </ProtectedAuthRoute>
            } />
            <Route path="/content-feed" element={
              <ProtectedAuthRoute>
                <ContentFeedPage />
              </ProtectedAuthRoute>
            } />
            <Route path="/search" element={
              <ProtectedAuthRoute>
                <SearchWorkPage />
              </ProtectedAuthRoute>
            } />
            <Route path="/work-space" element={
              <ProtectedAuthRoute>
                <WorkSpacePage />
              </ProtectedAuthRoute>
            } />
            <Route path="/work-darft" element={
              <ProtectedAuthRoute>
                <WorkDraftPage />
              </ProtectedAuthRoute>
            } />
            <Route path="/finance" element={
              <ProtectedAuthRoute>
                <FinanceManagementPage />
              </ProtectedAuthRoute>
            } />
          </Routes>
        </AppLayout>
      </ConfigProvider>
    </>
  );
}

export default App;
