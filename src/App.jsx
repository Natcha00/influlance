import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/influencer/home/HomePage';
import RegisterPage from './pages/influencer/authen/RegisterPage';
import ProfileInfomationPage from './pages/influencer/authen/ProfileInfomationPage';
import AddYourPortfolioPage from './pages/influencer/authen/AddYourPortfolioPage';
import ProfilePage from './pages/influencer/profile/ProfilePage';
import ContentFeedPage from './pages/influencer/content/ContentFeedPage';
import SearchWorkPage from './pages/influencer/content/SearchWorkPage';
import WorkSpacePage from './pages/influencer/work/WorkSpacePage';
import WorkDraftPage from './pages/influencer/work/WorkDraftPage';
import FinanceManagementPage from './pages/influencer/finance/FinanceManagementPage'
import LoginPage from './pages/influencer/authen/LoginPage';
import Navbar from './components/Navbar';
import AppLayout from './components/AppLayout';
import { Button, ConfigProvider } from 'antd';

function App() {

  return (
    <>
      <ConfigProvider
        theme={{
          "token": {
            "colorPrimary": "#722ed1",
            "colorInfo": "#722ed1",
            "colorText":"#fff"
          },
          components: {
            Collapse: {
              "colorFillAlter": "#722ed1",
              "colorBgContainer": "#000", //check
              "colorText": "#fff"
            },
            Layout: {
              bodyBg: "#000",
              headerColor:"#fff"
            },
            Card:{
              headerBg:"#722ed1",
              colorBgContainer:"#fff",
              colorText:"#000"
            },
            Input:{
              colorText:"#000"
            }
          }
        }}
      >
        <AppLayout>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile-information' element={<ProfileInfomationPage />} />
            <Route path='/add-your-portfolio' element={<AddYourPortfolioPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/content-feed' element={<ContentFeedPage />} />
            <Route path='/search' element={<SearchWorkPage />} />
            <Route path='/work-space' element={<WorkSpacePage />} />
            <Route path='/work-darft' element={<WorkDraftPage />} />
            <Route path='/finance' element={<FinanceManagementPage />} />
          </Routes>
        </AppLayout>
      </ConfigProvider>
    </>
  )
}

export default App


