import Layout from "../layout";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import request from "../helpers/requestHelper";
import moment from "moment";
import {JWTReader} from "../helpers/JWTReader";
import {Button} from "react-bootstrap";

const UnfinishedExams=()=>{

    const history = useNavigate();

    const [allExams, setAllExams] = useState([]);

    useEffect(()=>{
        getAllExams();
    }, [])

    const getAllExams=async ()=>{

        try {
            const res = await request({
                url: `exams/unfinished/exams`,
                auth: true,
                method: 'GET',
            });

            setAllExams(res);

        } catch (err) {

        }
    }

    const onExamClick=(id)=>{
        history(`/update-results/${id}`)
    }

    return(
        <Layout>
            <div className="card mb-0">
                <div className="card-body pt-4 pb-4 pr-5 pl-5">
                    <div className='display-4 pt-0 font-weight-normal'>Unfinished Exams</div>
                </div>
            </div>

            {allExams && allExams.length ?
                <div className="mt-5">
                    {allExams.map((el) =>{
                        return(
                            <div className="col-8 grid-margin stretch-card mx-auto mt-0 mb-0 cursor-pointer" onClick={() => onExamClick(el._id)}>
                                <div className="card mt-2">
                                    <div className="card-body d-flex flex-column">
                                        <h2 className="text-primary font-weight-light text-nowrap ellipsis overflow-hidden text-center" style={{textOverflow: 'ellipsis'}}>{el.name}</h2>
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

export default UnfinishedExams;