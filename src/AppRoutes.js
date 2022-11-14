import React, { Component,Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Spinner from './shared/Spinner';

const Login = lazy(() => import('./auth/Login'));
const Register = lazy(() => import('./auth/Register'));

const AllExams = lazy(() => import('./exams/AllExams'));
const ExamDetails = lazy(() => import('./exams/ExamDetails'));



class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Routes>
          <Route path="/auth/login" element={ <Login/> } />
          <Route path="/auth/register" element={ <Register/> } />
          <Route exact path="/exams" element={ <AllExams/> } />
          <Route exact path="/exams/:examId" element={ <ExamDetails/> } />

          <Route
              path={"*"}
              element={
                <Navigate
                    replace to="/auth/login"
                />
              }
          />

        </Routes>
      </Suspense>
    );
  }
}

export default AppRoutes;