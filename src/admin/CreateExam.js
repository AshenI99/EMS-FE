import {Button} from "react-bootstrap";
import React, {useState} from "react";
import request from "../helpers/requestHelper";
import moment from "moment";
import Layout from "../layout";
import {useNavigate} from "react-router-dom";

const CreateExam=()=>{

    const history = useNavigate();

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        venue: '',
        dateTime: '',
        closingDate: ''
    });

    const onChangeHandler=(e)=>{
        const {id, value} = e.target;

        setFormState({
            ...formState,
            [id]: value
        })
    }

    const onSubmit= async (e)=>{
        e.preventDefault();

        try {
            const res = await request({
                url: `exams`,
                auth: true,
                method: 'POST',
                data: formState
            });

            history("/exams")

        } catch (err) {

        }

    }

    return(
        <Layout>

            <div className="card mb-0">
                <div className="card-body pt-4 pb-4 pr-5 pl-5">
                    <div className='display-4 pt-0 font-weight-normal'>Create Exam</div>
                </div>
            </div>

            <div className="d-flex mt-4 auth px-0">
                <div className="row w-100 mx-0">
                    <div className="col-8 mx-auto">
                        <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                            <form className="pt-3" onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input type="text" required className="form-control form-control-lg" id="name" onChange={onChangeHandler} value={formState.name} placeholder="Enter Exam Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" required className="form-control form-control-lg" id="description" onChange={onChangeHandler} value={formState.description} placeholder="Enter Description" />
                                </div>
                                <div className="form-group">
                                    <input type="text" required className="form-control form-control-lg" id="venue" onChange={onChangeHandler} value={formState.venue} placeholder="Enter a Venue" />
                                </div>
                                <div className="form-group">
                                    <input type="datetime-local" className="form-control w-100" id="dateTime" onChange={onChangeHandler} value={formState.dateTime} />
                                </div>
                                <div className="form-group">
                                    <input type="date" className="form-control w-100" id="closingDate" onChange={onChangeHandler} value={formState.closingDate} />
                                </div>
                                <div className="mt-3">
                                    <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type='submit'>Create Exam</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateExam;