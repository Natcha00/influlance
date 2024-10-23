import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/influencer/authen/RegisterPage";
import ProfileInfomationPage from "./pages/influencer/authen/ProfileInfomationPage";
import ProfilePage from "./pages/influencer/profile/ProfilePage";
import ContentFeedPage from "./pages/influencer/content/ContentFeedPage";
import SearchWorkPage from "./pages/influencer/content/SearchWorkPage";
import WorkSpacePage from "./pages/influencer/work/WorkSpacePage";
import WorkDraftPage from "./pages/influencer/work/WorkDraftPage";
import FinanceManagementPage from "./pages/influencer/finance/FinanceManagementPage";
import LoginPage from "./pages/influencer/authen/LoginPage";
import Navbar from "./components/Navbar";
import AppLayout from "./components/AppLayout";
import { Button, ConfigProvider, DatePicker, Typography } from "antd";
import MainHomePage from "./pages/MainHomePage";
import InfluencerHomePage from "./pages/influencer/home/InfluencerHomePage";
import MarketerHomePage from "./pages/marketer/home/MarketerHomePage";
import MarketerWorkSpacePage from "./pages/marketer/work/MarketerWorkSpacePage";
import CheckWorkPage from "./pages/marketer/work/CheckWorkPage";
import MarketerProfilePage from "./pages/marketer/profile/MarketerProfilePage";
import ProtectedInfluencerAuthRoute from "./components/ProtectedInfluencerAuthRoute";
import ProtectedNoAuth from "./components/ProtectedNoAuthRoute";
import MarketerLoginPage from "./pages/marketer/authen/LoginPage";
import ProtectedMarketerAuthRoute from "./components/ProtectedMarketerAuthRoute";
import MarketerRegisterPage from "./pages/marketer/authen/RegisterPage";
import MarketerProfileInformationPage from "./pages/marketer/authen/ProfileInfomationPage";
import ViewProfilePage from "./pages/influencer/profile/ViewProfilePage";
import MarketerFinanceManagementPage from "./pages/marketer/finance/FinanceManagementPage";

function App() {
  const influTheme = {
    token: {
      colorPrimary: "#ff477e",
      colorText: "#fff",
    },
    components: {
      Collapse: {
        colorFillAlter: "#5A4FF5",
        colorBgContainer: "#000", //check
      },
      Typography: {

      },
      Layout: {
        bodyBg: "#000",
        headerColor: "#fff",
        headerHeight: "100%",
        // headerBg:'#fff'
      },
      Divider: {
        colorTextHeading: "#000",
      },
      Card: {
        headerBg: "linear-gradient(to right, #5A4FF5, #A582F7, #CE9FFC)",
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
        colorText: "#5A4FF5",
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
      DatePicker: {
        colorTextHeading: "#000",
        colorText: "#000"
      }
    },
  };
  return (
    <>
      <ConfigProvider theme={influTheme}>
        <Navbar />
        <AppLayout>
          <Routes>
            <Route path="/" element={<MainHomePage />} />
            <Route
              path="/influencer"
              element={<InfluencerHomePage />}
            />
            <Route
              path="/influencer/register"
              element={
                <ProtectedNoAuth>
                  <RegisterPage />
                </ProtectedNoAuth>
              }
            />
            <Route
              path="/influencer/login"
              element={
                <ProtectedNoAuth>
                  <LoginPage />
                </ProtectedNoAuth>
              }
            />
            <Route
              path="/influencer/profile-information"
              element={
                <ProfileInfomationPage />
              }
            />
            <Route path="/influencer/profile" element={
              <ProtectedInfluencerAuthRoute>
                <ProfilePage />
              </ProtectedInfluencerAuthRoute>
            } />
            <Route path="/influencer/content-feed" element={
              <ProtectedInfluencerAuthRoute>
                <ContentFeedPage />
              </ProtectedInfluencerAuthRoute>
            } />
            <Route path="/influencer/search" element={
              <ProtectedInfluencerAuthRoute>
                <SearchWorkPage />
              </ProtectedInfluencerAuthRoute>
            } />
            <Route path="/influencer/work-space" element={
              <ProtectedInfluencerAuthRoute>
                <WorkSpacePage />
              </ProtectedInfluencerAuthRoute>
            } />
            <Route path="/influencer/work-darft" element={
              <ProtectedInfluencerAuthRoute>
                <WorkDraftPage />
              </ProtectedInfluencerAuthRoute>
            } />
            <Route path="/influencer/finance" element={
              <ProtectedInfluencerAuthRoute>
                <FinanceManagementPage />
              </ProtectedInfluencerAuthRoute>
            } />



            <Route path="/marketer" element={<MarketerHomePage />} />
            <Route
              path="/marketer/login"
              element={
                <ProtectedNoAuth>
                  <MarketerLoginPage />
                </ProtectedNoAuth>
              }
            />
            <Route
              path="/marketer/register"
              element={
                <ProtectedNoAuth>
                  <MarketerRegisterPage />
                </ProtectedNoAuth>
              }
            />

            <Route
              path="/marketer/profile-information"
              element={
                <ProtectedNoAuth>
                  <MarketerProfileInformationPage />
                </ProtectedNoAuth>
              }
            />

            <Route path="/marketer/profile" element={
              <ProtectedMarketerAuthRoute>
                <MarketerProfilePage />
              </ProtectedMarketerAuthRoute>
            } />
            <Route
              path="/marketer/work-space"
              element={
                <ProtectedMarketerAuthRoute>
                  <MarketerWorkSpacePage />
                </ProtectedMarketerAuthRoute>
              }
            />
            <Route path="/marketer/check-work" element={
              <ProtectedMarketerAuthRoute>
                <CheckWorkPage />
              </ProtectedMarketerAuthRoute>
            } />



            <Route
              path="/marketer/profile"
              element={
                <ProtectedMarketerAuthRoute>
                  <ProfilePage />
                </ProtectedMarketerAuthRoute>
              }
            />
            <Route
              path="/marketer/content-feed"
              element={
                <ProtectedMarketerAuthRoute>
                  <ContentFeedPage />
                </ProtectedMarketerAuthRoute>
              }
            />
            <Route
              path="/marketer/search"
              element={
                <ProtectedMarketerAuthRoute>
                  <SearchWorkPage />
                </ProtectedMarketerAuthRoute>
              }
            />
            <Route
              path="/marketer/work-space"
              element={
                <ProtectedMarketerAuthRoute>
                  <WorkSpacePage />
                </ProtectedMarketerAuthRoute>
              }
            />

            <Route
              path="/marketer/view-influ-profile/:influId"
              element={
                <ProtectedMarketerAuthRoute>
                  <ViewProfilePage />
                </ProtectedMarketerAuthRoute>
              } />

            <Route
              path="/marketer/work-darft"
              element={
                <ProtectedMarketerAuthRoute>
                  <WorkDraftPage />
                </ProtectedMarketerAuthRoute>
              }
            />
            <Route
              path="/marketer/finance"
              element={
                <ProtectedMarketerAuthRoute>
                  <MarketerFinanceManagementPage />
                </ProtectedMarketerAuthRoute>
              }
            />
          </Routes>
        </AppLayout>
      </ConfigProvider>
    </>
  );
}

export default App;
