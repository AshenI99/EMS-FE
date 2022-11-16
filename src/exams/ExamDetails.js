import React, {useEffect, useState} from "react";
import request from "../helpers/requestHelper";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import {Button} from "react-bootstrap";
import Layout from "../layout";

const ExamDetails=()=>{

    const params = useParams();
    const history = useNavigate();

    const [examDetails, setExamDetails] = useState([]);

    useEffect(()=>{
        getExam();
    }, [])

    const getExam=async()=>{
        try {
            const res = await request({
                url: `exams/${params.examId}`,
                auth: true,
                method: 'GET',
            });

            setExamDetails(res);

        } catch (err) {
            history("/exams")
        }
    }

    const onExamClick=async (id)=>{
        try {
            const res = await request({
                url: `user/register-exam/${id}`,
                auth: true,
                method: 'POST',
            });

            history("/my-exams")

        } catch (err) {

        }
    }

    return(
        <Layout>
            <div className="card mb-3">
                <div className="card-body pt-4 pb-4 pr-5 pl-5">
                    <div className='display-4 pt-0 font-weight-normal'>{examDetails?.name}</div>
                </div>
            </div>

            <div className='stretch-card col-md-6 mx-auto mt-3'>
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-primary font-weight-light text-center">{examDetails?.name}</h2>
                        <p className="card-description mt-4 text-center">{examDetails?.description}</p>

                        <div className="h5 font-weight-light d-flex justify-content-between mt-5"><span className="text-info">Date:</span> {moment(examDetails?.dateTime).utc().format('YYYY-MM-DD')}</div>
                        <div className="h5 font-weight-light d-flex justify-content-between"><span className="text-info">Time:</span> {moment(examDetails?.dateTime).utc().format('hh:mm a')}</div>
                        <div className="h5 font-weight-light d-flex justify-content-between"><span className="text-info">Venue:</span> {examDetails?.venue}</div>

                        <Button onClick={() => onExamClick(examDetails?._id)} className="btn-inverse-danger w-100 mt-5">Register</Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ExamDetails;