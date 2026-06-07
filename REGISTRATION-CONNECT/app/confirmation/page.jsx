"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import QRCode from "react-qr-code";
import emailjs from "@emailjs/browser";
import "./confirmation.css";

function ConfirmationContent() {
const searchParams = useSearchParams();

const name = searchParams.get("name") || "";
const email = searchParams.get("email") || "";
const gender = searchParams.get("gender") || "";
const denomination = searchParams.get("denomination") || "";
const health = searchParams.get("health") || "";
const expectation = searchParams.get("expectation") || "";
const tribe = searchParams.get("tribe") || "";
const code = searchParams.get("code") || "";

useEffect(() => {
if (!email) return;

emailjs
  .send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    {
      name,
      email,
      gender,
      tribe,
      code,
      denomination,
      health,
      expectation,
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  )
  .then(() => {
    console.log("Email sent successfully");
  })
  .catch((error) => {
    console.error("Email error:", error);
  });

}, [
email,
name,
gender,
tribe,
code,
denomination,
health,
expectation,
]);

return (
<div className="confirmation-container">
<div className="confirmation-card">
<h1 className="success-title">
Registration Successful 🎉
</h1>

    <p className="success-text">
      Your registration has been completed successfully.
    </p>

    <div className="details">
      <p>
        <strong>Name:</strong> {name}
      </p>

      <p>
        <strong>Email:</strong> {email}
      </p>

      <p>
        <strong>Gender:</strong> {gender}
      </p>

      <p>
        <strong>Denomination:</strong> {denomination}
      </p>

      <p>
        <strong>Health:</strong> {health || "None"}
      </p>

      <p>
        <strong>Expectation:</strong> {expectation}
      </p>

      <p>
        <strong>Tribe:</strong> {tribe}
      </p>

      <p>
        <strong>Registration Code:</strong> {code}
      </p>
    </div>

    <div className="qr-wrapper">
      <QRCode
        value={JSON.stringify({
          name,
          email,
          tribe,
          code,
        })}
        size={220}
      />
    </div>

    <button
      className="download-btn"
      onClick={() => window.print()}
    >
      Download Ticket
    </button>
  </div>
</div>

);
}

export default function ConfirmationPage() {
return (
<Suspense fallback={<div>Loading confirmation...</div>}>
<ConfirmationContent />
</Suspense>
);
}
