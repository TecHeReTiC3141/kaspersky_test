import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from "react-router-dom";
import './index.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./HomePage.tsx";
import ErrorPage from "./ErrorPage.tsx";
import Layout from "./Layout.tsx";
import DashboardPage from "./DashboardPage.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EmployeeDataProvider from "./EmployeeContext.tsx";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<Layout/>} errorElement={<ErrorPage/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/dashboard" element={
                <EmployeeDataProvider>
                    <DashboardPage/>
                </EmployeeDataProvider>
            }/>
        </Route>
    </>
));

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </React.StrictMode>,
)
