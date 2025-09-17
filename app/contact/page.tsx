"use client";
import { useState } from "react";
import content from "../../locales/en/content.json";
import PageBanner from "@/components/PageBanner";
import { MapPin, Phone, Mail, Globe, Clock, ArrowRight } from "lucide-react";
const page = content.contact;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      alert("✅ Message sent successfully!");
      setFormData({ name: "", countryCode: "+91", phone: "", email: "", message: "" });
    } catch {
      alert("❌ Failed to send message. Try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative bg-[#fdf2df] poppins">
      {/* Top Banner */}
      <div className="inset-0 top-0">
        <PageBanner
          title={page.banner.title}
          image={page.banner.image}
          category={page.banner.heading}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl playfair font-extrabold text-gradient text-center mb-8">{page.title}</h1>
        <p className="text-lg text-center max-w-3xl mx-auto text-gray-600 mb-12">
          {page.content}
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Contact Form */}
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

              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="border p-3 focus:ring-2 focus:ring-gray-500 outline-none w-28"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+971">🇦🇪 +971</option>
                  {/* Add more codes as needed */}
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-3 focus:ring-2 focus:ring-gray-500 outline-none flex-1"
                  required
                />
              </div>

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

              <button  aria-label={sending ? "Sending..." : "Send Message"} type="submit" disabled={sending} className="px-6 py-3 gy-bg text-white font-medium shadow hover:gy-bg transition">
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
            <div className="flex flex-wrap justify-between items-center gap-6 mt-10">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">+91-98290-39590</p>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">info@namakwala.com</p>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">Mon-Fri: 24HRS IST</p>
              </div>
            </div>
          </div>

          {/* Right: Google Map */}
          {/* Right: Address Section */}
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
    </section>
  );
}
