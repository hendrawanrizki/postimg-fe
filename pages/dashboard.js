import Layout from "../layouts/default";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

function Dashboard() {

    //get token
    const token = Cookies.get('token');

    //state user
    const [user, setUser] = useState({});

    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/user`)
        .then((response) => {

            //set response user to state
            setUser(response.data);
        })
    }

    //hook useEffect
    useEffect(() => {

        //check token empty
        if(!token) {

            //redirect login page
            Router.push('/login');
        }
        
        //call function "fetchData"
        fetchData();
    }, []);

    //function logout
    const logoutHandler = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch Rest API
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`)
        .then(() => {

            //remove token from cookies
            Cookies.remove("token");

            //redirect halaman login
            Router.push('/login');
        });
    };

    return (
        <Layout>
            <Head>
                <title>Dashboard Post Image</title>
            </Head>
            <div className="container" style={{ marginTop: "80px" }}>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
                                <hr />
                                <button onClick={logoutHandler} className="btn btn-md btn-danger">LOGOUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
        
    )

}

export default Dashboard;