import Layout from "../layouts/default";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import axios from "axios";
import Cookies from 'js-cookie';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState([]);
    const loginHandler = async (login) => {
        login.preventDefault();
        const formData = new FormData();

        //append data to formData
        formData.append('email', email);
        formData.append('password', password);

        //send data to server
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, formData)
        .then((response) => {

            //set token on cookies
            Cookies.set('token', response.data.token);

            //redirect to dashboard
            Router.push('/dashboard');
        })
        .catch((error) => {

            //assign error to state "validation"
            setValidation(error.response.data);
        })
    };

    //hook useEffect
    useEffect(() => {

        //check token
        if(Cookies.get('token')) {

            //redirect page dashboard
            Router.push('/dashboard');
        }
    }, []);

    return(
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className="container" style={{ marginTop: '100px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <h4 className="fw-bold">HALAMAN LOGIN</h4>
                                <hr/>
                                {
                                    validation.message && (
                                        <div className="alert alert-warning">
                                            {validation.message}
                                        </div>
                                    )
                                }
                                <form onSubmit={loginHandler}>
                                    <div className="mb-3">
                                        <label className="form-label">ALAMAT EMAIL</label>
                                        <input type="email" className="form-control" value={email} onChange={(login) => setEmail(login.target.value)} placeholder="Masukkan Alamat Email"/>
                                    </div>
                                    {
                                        validation.email && (
                                            <div className="alert alert-warning">
                                                {validation.email[0]}
                                            </div>
                                        )
                                    }
                                    <div className="mb-3">
                                        <label className="form-label">PASSWORD</label>
                                        <input type="password" className="form-control" value={password} onChange={(login) => setPassword(login.target.value)} placeholder="Masukkan Password"/>
                                    </div>
                                    {
                                        validation.password && (
                                            <div className="alert alert-warning">
                                                {validation.password[0]}
                                            </div>
                                        )
                                    }
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">LOGIN</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login