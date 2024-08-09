import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("user_data"));
    if (storeData) {
      const { userToken, users } = storeData;
      setUser(users);
      setIsAuthenticated(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`; // sets the default Authorization header for all HTTP requests made with Axios.
    }
  }, []);

  const login = (newToken, newData) => {
    setUser(newData);
    setIsAuthenticated(true);
    localStorage.setItem(
      "user_data",
      JSON.stringify({ userToken: newToken, users: newData })
    );
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/profile", { withCredentials: true });
      setUser(data);
     console.log("Successfully fetched user data" )
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      if (error.response && error.response.status === 401) {
        console.error(
          "Unauthorized access - token might be invalid or expired."
        );
        logout(); // Optionally log out the user if unauthorized
      }
    }
  };

  const logout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem("user_data");
      setIsAuthenticated(false);
      setUser(null);

      // Clear cookies on the server side
      await axios.post("/logout", {}, { withCredentials: true });

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const likeCard = (card) => {
    // Implementation of likeCard function
    console.log("Card liked:", card);
  };

  const dislikeCard = (card) => {
    // Implementation of dislikeCard function
    console.log("Card disliked:", card);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        logout,
        login,
        isAuthenticated,
        likeCard,
        dislikeCard,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
