import { useState } from "react";
import styled from "styled-components";
import logo from "../../media/Logo.png";
import { login } from "../../services/trackIt";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";

export default function Login({setUser}) {
    const [userInfo, setUserInfo] = useState({email: "", password: ""})
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const signIn = () => {
        setLoading(true);
        login(userInfo)
            .then(res => {
                setUser(res.data)
                setLoading(false);
                history.push('/hoje');
            })
            .catch(error => {
                setLoading(false);
                alert("Campos inválidos");
            });
    }

    return (
        <>
            <Logo src={logo}/>
            <Input loading={loading} type='text' placeholder='email' value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})} />
            <Input loading={loading} type='text' placeholder='senha' value={userInfo.password} onChange={e => setUserInfo({...userInfo, password: e.target.value})} />
            <Button onClick={signIn} loading={loading}>
                {loading ? <Loader type="ThreeDots" color="#FFFFFF" height={13} width={51} /> : "Entrar"}
            </Button>
            <Link to="/cadastro">
                <Register>Não tem uma conta? Cadastre-se!</Register>
            </Link>
        </>
    );
}

const Logo = styled.img`
    display: block;
    width: 180px;
    height: 178px;
    margin: 68px auto 35px;
`;

const Input = styled.input`
    display: block;
    width: 303px;
    height: 45px;
    margin: 0 auto 7px;
    padding-left: 8px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    background-color: ${({loading}) => loading ? '#F2F2F2' : 'inherit'};
    color: ${({loading}) => loading ? '#AFAFAF' : '#666666'};
    pointer-events: ${({loading}) => loading ? 'none' : 'all'};

    ::placeholder {
        font-size: 20px;
        color: #DBDBDB;
    }
`;

const Button = styled.button`
    display: block;
    width: 303px;
    height: 45px;
    margin: 0 auto 7px;
    background-color: #52B6FF;
    color: #FFFFFF;
    font-size: 21px;
    border: none;
    border-radius: 5px;
    opacity: ${({loading}) => loading ? 0.7 : 1};
    pointer-events: ${({loading}) => loading ? 'none' : 'all'};
`;

const Register = styled.a`
    display: block;
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
    color: #52B6FF;
    text-decoration: underline;
`;