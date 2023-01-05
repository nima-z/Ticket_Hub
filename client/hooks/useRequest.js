import React, { useState } from "react";
import axios from "axios";

export default function useRequest({ url, method, body }) {
  const [errors, setErrors] = useState(null);

  async function requestHandle() {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {err.response.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  return { requestHandle, errors };
}
