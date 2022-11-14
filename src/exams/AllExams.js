import React, {useEffect, useState} from "react";
import request from "../helpers/requestHelper";
import moment from "moment";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

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
        <div>
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
                                    <div className="card-body">
                                        <h2 className="text-primary font-weight-light">{el.name}</h2>
                                        <p className="card-description">{el.description}</p>

                                        <div className="h5 font-weight-light d-flex justify-content-between"><span className="text-info">Date:</span> {moment(el.dateTime).utc().format('YYYY-MM-DD')}</div>
                                        <div className="h5 font-weight-light d-flex justify-content-between"><span className="text-info">Venue:</span> {el?.venue}</div>

                                        <div className="font-weight-light d-flex justify-content-center mt-5 text-danger" style={{fontSize: 14}}>
                                            Closing In {" "}
                                            {moment(el.closingDate).diff(moment.now(), 'days')} Days {" "}
                                            {moment(el.closingDate).subtract(moment(el.closingDate).diff(moment.now(), 'days'), 'days').diff(moment.now(), 'hours')} Hours {" "}
                                            {moment(el.closingDate).subtract(moment(el.closingDate).diff(moment.now(), 'hours'), 'hours').diff(moment.now(), 'minutes')} Minutes
                                        </div>

                                        <Button onClick={() => onExamClick(el._id)} className="btn-inverse-danger w-100 mt-2">Register</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            : ''}

        </div>
    )
}

export default AllExams;