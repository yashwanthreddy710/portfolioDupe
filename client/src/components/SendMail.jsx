import { useState } from "react";

const SendMail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5000/api/email/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: email, subject: "Message from Yash", text: message }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Email sent successfully!");
        setStatus("Email sent successfully!");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Failed to send email: " + data.error);
      }
    } catch (error) {
        alert("Error: " + error.message);
      setStatus("Error: " + error.message);
    }
  };

  return (
    <div className="p-4 mx-120 text-white bg-gray-800 rounded shadow w-full max-w-md">
      <h2 className="text-lg font-bold mb-2">Send Email</h2>
      <form onSubmit={handleSend} className="space-y-2">
        <input
          type="email"
          placeholder="Recipient's Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Send
        </button>
      </form>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
};

export default SendMail;


