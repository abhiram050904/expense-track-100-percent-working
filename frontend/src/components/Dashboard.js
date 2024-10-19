import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalcontext';
import History from './history';
import { FaIndianRupeeSign } from "react-icons/fa6";
import Chart from './chart';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, [getIncomes, getExpenses]);

    const safeMin = (arr) => (arr.length > 0 ? Math.min(...arr.map(item => item.amount)) : 0);
    const safeMax = (arr) => (arr.length > 0 ? Math.max(...arr.map(item => item.amount)) : 0);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', color: 'rgba(34, 34, 96, 1)' }}>
                    All Transactions
                </h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p style={{ color: 'green' }}> {/* Set total income color */}
                                    <FaIndianRupeeSign /> {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p style={{ color: 'red' }}> {/* Set total expense color */}
                                    <FaIndianRupeeSign /> {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p style={{ color: 'green' }}> {/* Set total balance color */}
                                    <FaIndianRupeeSign /> {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">
                            Min <span>Salary</span> Max
                        </h2>
                        <div className="salary-item">
                            <p>
                                <FaIndianRupeeSign /> {safeMin(incomes)}
                            </p>
                            <p>
                                <FaIndianRupeeSign /> {safeMax(incomes)}
                            </p>
                        </div>
                        <h2 className="salary-title">
                            Min <span>Expense</span> Max
                        </h2>
                        <div className="salary-item">
                            <p>
                                <FaIndianRupeeSign /> {safeMin(expenses)}
                            </p>
                            <p>
                                <FaIndianRupeeSign /> {safeMax(expenses)}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    color: rgba(34, 34, 96, 1);
    
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }

        .chart-con {
            grid-column: 1 / 4;
            height: 400px;

            @media (max-width: 768px) {
                grid-column: 1 / -1;
            }

            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;

                @media (max-width: 768px) {
                    grid-template-columns: 1fr;
                }

                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;

                    p {
                        font-size: 3rem;
                        font-weight: 700;

                        @media (max-width: 768px) {
                            font-size: 2.5rem;
                        }
                    }
                }

                .balance {
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    @media (max-width: 768px) {
                        grid-column: 1;
                    }

                    p {
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4rem;

                        @media (max-width: 768px) {
                            font-size: 3.5rem;
                        }
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;

            @media (max-width: 768px) {
                grid-column: 1 / -1;
            }

            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 1.5rem;

                @media (max-width: 768px) {
                    font-size: 1.2rem;
                }
            }

            .salary-title {
                font-size: 1.2rem;

                span {
                    font-size: 1.5rem;
                }
            }

            .salary-item {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    font-weight: 600;
                    font-size: 1.4rem;

                    @media (max-width: 768px) {
                        font-size: 1.2rem;
                    }
                }
            }
        }
    }
`;

const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;
    height: 100%;
`;

export default Dashboard;
