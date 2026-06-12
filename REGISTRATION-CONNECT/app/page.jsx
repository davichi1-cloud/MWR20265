"use client";

export default function HomePage() {
  const registrationClosed = true;

  if (registrationClosed) {
    return (
      <main className="closed-container">
        <div className="closed-card">
          <img
            src="/logo.png"
            alt="The Connect"
            className="closed-logo"
          />

          <p className="retreat-text">
            Ministers and Workers Retreat 2026
          </p>

          <h1 className="closed-title">
            Registration Closed
          </h1>

          <p className="closed-message">
            Registration for the Ministers and Workers Retreat 2026
            has officially closed.
          </p>

          <p className="closed-message">
            We sincerely appreciate your interest and support.
          </p>

          <p className="closed-message">
            For enquiries, please contact techdepartmentrccgtheconnect@gmail.com.
          </p>

          <div className="closed-line"></div>

          <p className="closed-footer">
            Thank you and God bless you.
          </p>
        </div>
      </main>
    );
  }

  return null;
}
