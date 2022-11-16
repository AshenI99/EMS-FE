import React, {useEffect, useState} from "react";
import request from "../helpers/requestHelper";
import moment from "moment";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Layout from "../layout";
import {JWTReader} from "../helpers/JWTReader";

const AllExams=()=>{

    const history = useNavigate();

    const [allExams, setAllExams] = useState([]);

    useEffect(()=>{
        getAllExams();
    }, [])

    const getAllExams=async ()=>{

        try {
            const res = await request({
                url: `exams`,
                auth: true,
                method: 'GET',
            });

            setAllExams(res);

        } catch (err) {

        }
    }

    const onExamClick=(id)=>{
        history(`/exams/${id}`)
    }

    return(
        <Layout>
            <div className="card mb-3">
                <div className="card-body pt-4 pb-4 pr-5 pl-5">
                    <div className='display-4 pt-0 font-weight-normal'>Available Exams</div>
                </div>
            </div>
            {allExams && allExams.length ?
                <div className='row'>
                    {allExams.map((el) =>{
                        return(
                            <div className="col-md-4 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body d-flex flex-column">
                                        <h2 className="text-primary font-weight-light text-nowrap ellipsis overflow-hidden text-center" style={{textOverflow: 'ellipsis'}}>{el.name}</h2>
                                        <p className="card-description mt-4 justify-content-center d-flex text-center mb-auto">{el.description}</p>

                                        <div className="h5 font-weight-light d-flex justify-content-center mt-4"><span className="text-info me-4">Date:</span> {moment(el.dateTime).utc().format('YYYY-MM-DD')}</div>
                                        <div className="h5 font-weight-light mb-auto d-flex justify-content-center"><span className="text-info me-4">Venue:</span> {el?.venue}</div>

                                        <div className="font-weight-light d-flex justify-content-center mt-4 text-danger" style={{fontSize: 14}}>
                                            Closing In {" "}
                                            {moment(el.closingDate).diff(moment.now(), 'days')} Days {" "}
                                            {moment(el.closingDate).subtract(moment(el.closingDate).diff(moment.now(), 'days'), 'days').diff(moment.now(), 'hours')} Hours {" "}
                                            {moment(el.closingDate).subtract(moment(el.closingDate).diff(moment.now(), 'hours'), 'hours').diff(moment.now(), 'minutes')} Minutes
                                        </div>

                                        {!JWTReader(localStorage.getItem("token"))?.isAdmin ?
                                            <Button onClick={() => onExamClick(el._id)} className=" btn-inverse-danger w-100 mt-2">Register</Button>
                                        : ''}
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

export default AllExams;