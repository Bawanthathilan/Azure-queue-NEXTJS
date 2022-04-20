import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { QueueServiceClient } from "@azure/storage-queue";

//config azure credientials
const account = "<storage account name>";
const sas = "<SAS Key>";
const queueName = "<Your queue name>";

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net${sas}`
);

export default function Home() {
  const [values, setValues] = useState({
    email: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const encodeString = btoa(JSON.stringify(values));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const queueClient = queueServiceClient.getQueueClient(queueName);
      const sendMessageResponse = await queueClient.sendMessage(encodeString);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      Azure queue Storage
      <form onSubmit={handleSubmit}>
        <input
          placeholder="enter email"
          id="email"
          name="email"
          value={values.email}
          onChange={onChange}
        />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
