import React from 'react';
import SignUp from './components/SignUp';
import { Route, Routes } from "react-router-dom";
import { Layout, Menu } from 'antd';

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
          
          <Routes>
            <Route element={<SignUp />} path="/register" />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Para Harcama ©2021 Created by Ugurcan</Footer>
      </Layout>

    </>
  )
}

export default App;
