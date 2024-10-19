import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../context/globalcontext';
import Button from './button';
import { FaPlus } from "react-icons/fa";

function Form() {
    const { addExpense, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!title || !amount || !date || !category) {
            setError('Please fill in all fields.');
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        setIsLoading(true); // Start loading state
        try {
            await addExpense(inputState);
            setInputState({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: '',
            });
        } catch (err) {
            setError('Failed to add expense. Please try again.');
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date });
                    }}
                    className="datepicker" // Add a class for styling
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
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
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
                    name={isLoading ? 'Adding...' : 'Add Expense'}
                    icon={FaPlus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'#ADD8E6'}
                    color={'#fff'}
                    hoverColor={'#32CD32'} // Green on hover
                    hoverSize={'1.1'}       // Increase size to 110% on hover
                    disabled={isLoading} // Disable button while loading
                />
            </div>
        </FormStyled>
    );
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 600px; /* Keep the form width */
    width: 100%; /* Full width */
    margin: 0 auto; /* Center form */
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
        width: 80%; /* Set to 80% width for consistency */
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
        width: 100%; /* Ensures input controls take full width */
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
