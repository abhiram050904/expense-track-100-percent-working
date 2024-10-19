import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import bg from '../images/bg2.jpg';
import Navigation from '../components/navigation';
import Dashboard from '../components/Dashboard';
import Transactions from '../components/transactions';
import Income from '../components/income';
import Expenses from '../components/expenses';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [active, setActive] = useState(1);  // Start with 1 to show Dashboard by default
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = localStorage.getItem("chat-app-user");
        if (!user) {
          navigate("/login");
        } else {
          setCurrentUser(JSON.parse(user));
        }
      } catch (error) {
        console.error("Failed to parse user data", error);
        navigate("/login");
      } finally {
        setLoading(false); // Set loading to false after attempting to fetch user
      }
    };
    fetchUser();
  }, [navigate]);

  // If loading, show a loading spinner or message
  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>; // You can create a styled loading message
  }

  // Mapping the components to improve readability and extensibility
  const components = {
    1: <Dashboard />,
    2: <Transactions />,
    3: <Income />,
    4: <Expenses />,
  };

  return (
    <AppDesign bg={bg} className='app'>
      <MainLayout>
        <Navigation active={active} setActive={setActive} username={currentUser?.username || "Guest"} />
        <main>
          {components[active] || <Dashboard />}
        </main>
      </MainLayout>
    </AppDesign>
  );
};

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #f7add6;
`;

const AppDesign = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  position: relative;
  
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    padding: 2rem;
    overflow-y: auto;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

const MainLayout = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  gap: 2rem;
  color: #f7add6;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export default Home;
