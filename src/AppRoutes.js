import React, {Component, Suspense, lazy} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import Spinner from './shared/Spinner';
import MyExams from "./exams/MyExams";
import MyResults from "./exams/MyResults";
import {JWTReader} from "./helpers/JWTReader";
import CreateExam from "./admin/CreateExam";

const Login = lazy(() => import('./auth/Login'));
const Register = lazy(() => import('./auth/Register'));

const AllExams = lazy(() => import('./exams/AllExams'));
const ExamDetails = lazy(() => import('./exams/ExamDetails'));


class AppRoutes extends Component {
    render() {
        return (
            <Suspense fallback={<Spinner/>}>
                {localStorage.getItem('token') ?
                    <div>
                        {!JWTReader(localStorage.getItem("token"))?.isAdmin ?
                            <Routes>
                                <Route exact path="/exams" element={<AllExams/>}/>
                                <Route exact path="/exams/:examId" element={<ExamDetails/>}/>
                                <Route exact path="/my-exams" element={<MyExams/>}/>
                                <Route exact path="/my-results" element={<MyResults/>}/>
                                <Route
                                    path={"*"}
                                    element={
                                        <Navigate
                                            replace to="/exams"
                                        />
                                    }
                                />

                            </Routes>
                        :
                            <Routes>
                                <Route exact path="/exams" element={<AllExams/>}/>
                                <Route exact path="/create-exam" element={<CreateExam/>}/>

                                <Route
                                    path={"*"}
                                    element={
                                        <Navigate
                                            replace to="/exams"
                                        />
                                    }
                                />
                            </Routes>
                        }
                    </div>
                    :
                    <Routes>
                        <Route path="/auth/login" element={<Login/>}/>
                        <Route path="/auth/register" element={<Register/>}/>
                        <Route
                            path={"*"}
                            element={
                                <Navigate
                                    replace to="/auth/login"
                                />
                            }
                        />

                    </Routes>
                }
            </Suspense>
        );
    }
}

export default AppRoutes;