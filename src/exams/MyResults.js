import React, {useEffect, useState} from "react";
import request from "../helpers/requestHelper";
import moment from "moment";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Layout from "../layout";

const MyExams=()=>{

    const history = useNavigate();

    const [allExams, setAllExams] = useState([]);

    useEffect(()=>{
        getAllMyExams();
    }, [])

    const getAllMyExams=async ()=>{

        try {
            const res = await request({
                url: `user/exam-results`,
                auth: true,
                method: 'GET',
            });

            setAllExams(res);

        } catch (err) {

        }
    }

    console.log(allExams)
    return(
        <Layout>
            <div className="card mb-3">
                <div className="card-body pt-4 pb-4 pr-5 pl-5">
                    <div className='display-4 pt-0 font-weight-normal'>My Results</div>
                </div>
            </div>
            {allExams && allExams.length ?
                <div>
                    {allExams.filter((exam) => moment().diff(exam.examId.dateTime, 'days') > 2).map((el) =>{
                        return(
                            <div className="col-md-4 grid-margin stretch-card mx-auto">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="text-primary mt-3 font-weight-light text-center text-uppercase">{el.examId.name}</h3>
                                        <p className="card-description">{el.description}</p>

                                        <div className="h5 font-weight-bold d-flex justify-content-center mt-5 ps-5 pe-5">
                                            <span className="text-info me-4">Result:</span>
                                            {moment().diff(el.examId.dateTime, 'days') > 2 ? el?.result?.toUpperCase() : 'Pending'}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            : ''}

        </Layout>
    )
}

export default MyExams;