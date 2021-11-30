import SignUp from './components/SignUp';
import { Route } from "react-router-dom";
import { Layout, Menu } from 'antd';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Categories from './components/Categories'
import Records from './components/Records';

function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '50px', marginTop: 64 }}>


          <Route component={SignUp} path="/register" />
          <Route component={Login} path="/login" />
          <PrivateRoute component={Categories} path="/categories" />
          <PrivateRoute component={Records} path="/records" />

        </Content>
        <Footer style={{ textAlign: 'center' }}>Para Harcama ©2021 Created by Ugurcan</Footer>
      </Layout>

    </>
  )
}

export default App;
