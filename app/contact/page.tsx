"use client";
import { useState } from "react";
import content from "../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import { MapPin } from "lucide-react";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const page = content.contact;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // ✅ popup state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
      setError("❌ Please enter a valid phone number");
      return;
    }
    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");

      // ✅ Show popup on success
      setShowPopup(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch {
      alert("❌ Failed to send message. Try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative bg-[#fdf2df] poppins">
      <PageBanner
        title={page.banner.title}
        image={page.banner.image}
        category={page.banner.heading}
      />

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl playfair font-extrabold text-gradient text-center mb-8">
          {page.title}
        </h1>
        <p className="text-lg text-center max-w-3xl mx-auto text-gray-600 mb-12">
          {page.content}
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-3 focus:ring-2 focus:ring-gray-500 outline-none"
                required
              />

              <PhoneInput
                international
                defaultCountry="IN"
                value={formData.phone}
                onChange={(value) =>
                  setFormData({ ...formData, phone: value || "" })
                }
                className="border p-3 focus:ring-2 focus:ring-gray-500 outline-none w-full"
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-3 focus:ring-2 focus:ring-gray-500 outline-none"
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="border p-3 focus:ring-2 focus:ring-gray-500 outline-none"
                rows={5}
                required
              />

              <button
                type="submit"
                disabled={sending}
                className="px-6 py-3 gy-bg text-white font-medium shadow hover:gy-bg transition"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Addresses */}
          <div className="overflow-hidden px-6 py-3">
            <div className="flex flex-col justify-between gap-4">
              {page.addresses.map((addr, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-border shadow-lg p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl hover:border-primary cursor-pointer"
                >
                  <MapPin className="w-6 h-6 text-primary mb-2" />
                  <h5 className="font-bold text-sm text-gradient mb-1 text-center playfair">
                    {addr.title}
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    {addr.lines.map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm text-center shadow-lg">
            <h2 className="text-xl font-semibold mb-2">
              Thank you for connecting with us!
            </h2>
            <p className="text-gray-700 mb-4">
              Our team will get back to you soon.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-primary text-white rounded hover:gy-bg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
