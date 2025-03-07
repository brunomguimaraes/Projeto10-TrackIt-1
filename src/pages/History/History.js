import { useContext, useState, useEffect } from "react";
import { getHistory } from "../../services/trackIt";
import UserContext from "../../contexts/UserContext";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import dayjs from "dayjs";
import styled from "styled-components";
import Header from "../../components/Header";
import Menu from "../../components/Menu";

export default function History() {
    const {user} = useContext(UserContext);
    const [history, setHistory] = useState([]);
    let dates;
    let isCompleted;

    const loadHistory = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        getHistory(config)
            .then(res => {
                setHistory(res.data);
            })
    }

    const getHistoryInfo = () => {
        dates = history.map(date => date.day);
        isCompleted = history.map(date => {
            const habitsDone = date.habits.filter(habit => habit.done === true);
            if(habitsDone.length === date.habits.length) {
                return true;
            } else {
                return false;
            }
        })
    }

    const formateDate = (date) => {
        getHistoryInfo();
        const newDate = dayjs(date.date).format('DD/MM/YYYY');
        const today = dayjs().format('DD/MM/YYYY');

        if (dates.includes(newDate) && newDate !== today) {
            if(isCompleted[dates.indexOf(newDate)]) {
                return ('complete');
            } else {
                return ('incomplete');
            }
        }   
    }

    useEffect(() => {
        loadHistory();
    }, []);

    return(
        <>
            <Header/>
            <HistoryContainer>
                <h2>Histórico</h2>
                <Calendar calendarType={"US"} tileClassName={(date) => formateDate(date)}/>
            </HistoryContainer>
            <Menu/>
        </>
    );
}

const HistoryContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #F2F2F2;
    padding: 70px 15px;

    h2 {
        color: #126BA5;
        font-size: 23px;
        padding: 25px 0;
        font-weight: 400;
    }

    p {
        color: #666666;
        font-size: 18px;
    }

    .react-calendar {
        width: 100%;
        border-radius: 10px;
        border: none;

        .complete {
            background-color: #8CC655;
            border-radius: 45px;
        }

        .incomplete {
            background-color: #EA5766;
            border-radius: 45px;
        }
    }

    .react-calendar__month-view__days__day {
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;