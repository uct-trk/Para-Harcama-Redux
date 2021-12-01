import SignUp from './components/SignUp';
import { Route } from "react-router-dom";
import { Layout } from 'antd';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Categories from './components/Categories'
import Records from './components/Records';
import AppHeader from './components/AppHeader';
import Logout from './components/Logout';

function App() {
  const { Content, Footer } = Layout;
  return (
    <>
      <Layout>
        <AppHeader />
        <Content className="site-layout" style={{ padding: '50px', marginTop: 64 }}>

          <Route component={SignUp} path="/register" />
          <Route component={Login} path="/login" />
          <PrivateRoute component={Categories} path="/categories" />
          <PrivateRoute component={Records} path="/records" />
          <Route path="/logout" component={Logout} />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Para Harcama ©2021 Created by Ugurcan</Footer>
      </Layout>

    </>
  )
}

export default App;
