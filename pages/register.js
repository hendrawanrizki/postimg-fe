import Layout from "../layouts/default";
import { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import axios from "axios";

function Register() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [validation, setValidation] = useState([]);

    const registerHandler = async (regist) => {
        regist.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/register`, formData)
        .then(() => {
            Router.push('/login')
        })
        .catch((error) => {
            setValidation(error.response.data);
        })
    };

    return(
        <Layout>
            <Head>
                <title>Daftar Akun Baru</title>
            </Head>
            <div className="container" style={{ marginTop: '100px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <h4 className="fw-bold">HALAMAN REGISTER</h4>
                                <hr/>
                        
                                <form onSubmit={registerHandler}>
                                    <div class="mb-3">
                                        <label for="exampleInputName" class="form-label">Nama Lengkap</label>
                                        <input type="text" className="form-control" value={name} onChange={(regist) => setName(regist.target.value)} placeholder="Masukkan Nama Lengkap"/>
                                        {
                                                validation.name && (
                                                <div class="alert alert-warning" role="alert">
                                                    {validation.name[0]}
                                                </div>                                                
                                        )}                                        
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleInputEmail" class="form-label">Email</label>
                                        <input type="email" className="form-control" value={email} onChange={(regist) => setEmail(regist.target.value)} placeholder="Masukkan Alamat Email"/>
                                        {
                                                validation.email && (
                                                <div class="alert alert-warning" role="alert">
                                                    {validation.name[0]}
                                                </div>                                                
                                        )}
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleInputPassword" class="form-label">Password</label>
                                        <input type="password" className="form-control" value={password} onChange={(regist) => setPassword(regist.target.value)} placeholder="Masukkan Password"/>
                                        {
                                                validation.password && (
                                                <div class="alert alert-warning" role="alert">
                                                    {validation.name[0]}
                                                </div>                                                
                                        )}
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleInputPasswordConfirmation" class="form-label">Konfirmasi Password</label>
                                        <input type="password" className="form-control" value={passwordConfirmation} onChange={(regist) => setPasswordConfirmation(regist.target.value)} placeholder="Masukkan Konfirmasi Password"/>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">REGISTER</button>
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

export default Register