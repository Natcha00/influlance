import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/influencer/home/HomePage";
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

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#722ed1",
            colorText: "#fff",
          },
          components: {
            Collapse: {
              colorFillAlter: "#722ed1",
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
              headerBg: "#722ed1",
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
              colorText: "#722ed1",
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
            <Route path="/" element={<HomePage />} />
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
