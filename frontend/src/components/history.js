import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalcontext';

function History() {
    const { transactionHistory } = useGlobalContext();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const fetchedHistory = transactionHistory(); // Fetch transaction history
            setHistory(fetchedHistory);
        } catch (err) {
            setError("Failed to load transaction history.");
        } finally {
            setLoading(false);
        }
    }, [transactionHistory]);

    if (loading) {
        return <LoadingMessage>Loading...</LoadingMessage>; // Loading state
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>; // Error message
    }

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) => {
                const { _id, title, amount, type } = item;
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`
                            }
                        </p>
                    </div>
                );
            })}
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .history-item {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const LoadingMessage = styled.p`
    text-align: center;
    font-size: 1.5rem;
    color: var(--color-primary);
`;

const ErrorMessage = styled.p`
    text-align: center;
    font-size: 1.5rem;
    color: red;
`;

export default History;
