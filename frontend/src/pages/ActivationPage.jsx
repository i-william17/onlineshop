import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        setLoading(true);
        await axios
          .post(`${server}/user/activation`, { activation_token })
          .then((res) => {
            console.log(res);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.response?.data?.message || "Something went wrong");
            setLoading(false);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <p>Activating your account...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
