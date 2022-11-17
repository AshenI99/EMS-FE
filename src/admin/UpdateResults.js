import Layout from "../layout";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import request from "../helpers/requestHelper";
import {Button} from "react-bootstrap";

const UpdateResults = () => {

    const history = useNavigate();
    const params = useParams();

    const [examDetails, setExamDetails] = useState({});
    const [studentsDetails, setStudentsDetails] = useState([]);
    const [filledCount, setFilledCount] = useState(0);

    useEffect(() => {
        getExam();
    }, [])

    const getExam = async () => {
        try {
            const res = await request({
                url: `student-exams/exam/${params.examId}`,
                auth: true,
                method: 'GET',
            });

            if(res?.exam?.isFinished){
                history("/exams/unfinished/exams")
            } else {
                setExamDetails(res?.exam);
                setStudentsDetails(res?.results);
            }

        } catch (err) {
            history("/exams/unfinished/exams")
        }
    }

    const onChangeHandler=(e, id)=>{
        let students = JSON.parse(JSON.stringify(studentsDetails));

        students[id].result = e.target.value;
        setStudentsDetails(students);
        const count = studentsDetails.filter((el) => el.result).length;
        setFilledCount(e.target.value ? count + 1 : count - 1);
    }

    const onSubmitClick = async () => {
        try {
            const res = await request({
                url: `student-exams/exam/${params.examId}`,
                auth: true,
                method: 'PUT',
                data: {results: studentsDetails}
            });

            history("/exams")

        } catch (err) {

        }
    }

    console.log(studentsDetails, filledCount)
    return (
        <Layout>
            <div className="card mb-0">
                <div className="card-body pt-4 pb-4 pr-5 pl-5">
                    <div className='display-4 pt-0 font-weight-normal'>Update Results - {examDetails.name}</div>
                </div>
            </div>

            <div className="card mt-2">
                <div className="card-body d-flex flex-column">
                    {studentsDetails && studentsDetails.length ?
                        <div className="mt-5 d-flex flex-column">
                            {studentsDetails.map((el, index) => {
                                return (
                                    <div className="col-8 grid-margin stretch-card mx-auto mt-0 mb-0 cursor-pointer">

                                        <div className="card mt-2">
                                            <div className="card-body d-flex flex-row justify-content-between align-items-center ps-5 pe-5">
                                                <span className="font-weight-normal text-nowrap overflow-hidden" style={{fontSize: 18}}>{el.studentId.firstName} {el.studentId.lastName}</span>
                                                <span>
                                                    <select className="form-control form-control form-select" value={el.result} onChange={(e) => onChangeHandler(e, index)} placeholder="Enter Exam Name" >
                                                        <option value="">Select a grade</option>
                                                        <option value="A">A</option>
                                                        <option value="B">B</option>
                                                        <option value="C">C</option>
                                                        <option value="I">I</option>
                                                    </select>

                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}

                            <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn mt-5 mb-4 ms-auto me-5" onClick={onSubmitClick} disabled={filledCount < studentsDetails.length}>Submit Results</Button>

                        </div>
                        : ''}
                </div>
            </div>


        </Layout>
    )
}

export default UpdateResults;