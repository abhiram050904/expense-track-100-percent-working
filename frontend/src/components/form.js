import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../context/globalcontext';
import Button from './button';
import { FaPlus } from "react-icons/fa";

function Form() {
    const { addIncome, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: null,
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError(''); // Clear error on input change
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Basic validation
        if (!title || !amount || !date || !category) {
            setError("Please fill in all fields.");
            return;
        }

        addIncome(inputState);
        setInputState({
            title: '',
            amount: '',
            date: null,
            category: '',
            description: '',
        });
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                    required // Make title required
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="number" // Change type to number for validation
                    name={'amount'}
                    placeholder={'Salary Amount'}
                    onChange={handleInput('amount')}
                    required // Make amount required
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date });
                    }}
                    className="datepicker"
                    required // Make date required
                />
            </div>
            <div className="selects input-control">
                <select
                    required
                    value={category}
                    name="category"
                    id="category"
                    onChange={handleInput('category')}
                >
                    <option value="" disabled>Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">Youtube</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    value={description}
                    placeholder='Add A Reference'
                    id="description"
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Add Income'}
                    icon={FaPlus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'#ADD8E6'}
                    color={'#fff'}
                    hoverColor={'#32CD32'}
                    hoverSize={'1.1'}
                />
            </div>
        </FormStyled>
    );
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 600px; 
    width: 100%; 
    margin: 0 auto; 
    padding: 2rem;

    input, textarea, select, .datepicker {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        padding: .5rem 1rem;
        border-radius: 8px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        width: 80%; 
        transition: all 0.3s ease;

        &::placeholder {
            color: black;
        }

        &:hover,
        &:focus {
            transform: scale(1.05);
            border-color: lightblue;
            background-color: rgba(173, 216, 230, 0.3);
        }
    }

    .input-control {
        width: 100%; 
    }

    .selects {
        display: flex;
        justify-content: flex-end;
    }

    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: #32CD32 !important;
                transform: scale(1.1);
            }
        }
    }
`;

export default Form;
