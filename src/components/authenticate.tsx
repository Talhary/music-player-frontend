import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { updateUser, clearUser } from '../stores/user';
import { useNavigate } from "react-router";
function App() {
  const [msg, setMsg] = useState("Authenticating");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // Step 1: Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    if (token) {
      document.cookie = `token=${token}; path=/;`;
    }

    const authenticate = async (token:string) => {
      try {
        const response = await fetch(`http://localhost:5000/auth/user`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data?.user?.email) {
          dispatch(updateUser(data.user));
          navigate('/')
        } else {
          setMsg("Authentication failed Please Login again");
          setTimeout(() => {
            navigate('/')
        }, 3000);
        }
      } catch (error) {
        console.log(error);
        setMsg("Error occurred during authentication");
      }
    };
    if(token)authenticate(token)

    // Optionally, redirect to another page
    // window.location.href = '/new-page';  // Replace with your desired redirect URL
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <div>
      <h1>{msg}</h1>
    </div>
  );
}

export default App;
