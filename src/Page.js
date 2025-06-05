import { useState, useEffect } from "react";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });
  

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (form.name && form.message) {
    try {
      const response = await fetch("https://coronation-website.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newMsg = await response.json();
      setMessages([newMsg, ...messages]);
      setForm({ name: "", message: "" });
    } catch (error) {
      console.error("Error posting message:", error);
    }
  }
};

useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };
  fetchMessages();
}, []);

  const galleryItems = [
    { type: "image", src: "/asset/image1.jpg", alt: "Coronation Day 1" },
    { type: "image", src: "/asset/image2.jpg", alt: "Coronation Day 2" },
    { type: "image", src: "/asset/Image333.jpg", alt: "Coronation Day 3" },
    { type: "image", src: "/asset/Image334.jpg", alt: "Coronation Day 4" },
    { type: "image", src: "/asset/image4.jpg", alt: "Coronation Day 5" },
    { type: "video", src: "/Video1.mp4" },
    { type: "video", src: "/Video2.mp4" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const handleChangeItem = (direction) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        direction === "next"
          ? (prev + 1) % galleryItems.length
          : (prev - 1 + galleryItems.length) % galleryItems.length
      );
      setTransitioning(false);
    }, 300); // matches transition duration
  };

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
const [msgTransitioning, setMsgTransitioning] = useState(false);

const handleMessageChange = (direction) => {
  setMsgTransitioning(true);
  setTimeout(() => {
    setCurrentMessageIndex((prev) =>
      direction === "next"
        ? (prev + 1) % messages.length
        : (prev - 1 + messages.length) % messages.length
    );
    setMsgTransitioning(false);
  }, 300); // match transition duration
};


  return (
    
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 p-6 font-serif">
        <div className="stars"></div>
        {/* <div className="twinkling"></div> */}
   <header className="relative flex flex-col items-center justify-center text-center ">

  {/* Crown Image */}
  <img
    src="/asset/crownnnn.png"
    alt="Crown"
    className=" mt-[-65px]"
  />

</header>




      {/* Biography Section */}
      <section className="max-w-4xl mx-auto mb-16 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Biography</h2>
        <p>
          Igwe Dr. Amanze Ikwu is a medical doctor and researcher working as a cardiologist at
          University Hospitals Plymouth NHS Trust in the United Kingdom. His expertise lies in
          cardiology and general medicine, with a strong background in research. Igwe Dr. Amanze
          serves as a Principal Investigator at University Hospitals Plymouth NHS Trust and works as
          a General Medical Physician at Practice Plus Group Hospital in Plymouth, United Kingdom.
          Although specific research interests aren't detailed, Dr. Ikwu has been cited 58 times on
          Google Scholar, indicating his work has some impact in the medical community, particularly
          in cardiology and general medicine.
        </p>
        <p className="mt-4">
          Born with grace and raised with purpose, His Majesty has always stood for justice,
          compassion, and the unity of his people. Today, we celebrate his formal coronation and
          honor a legacy in the making.
        </p>
      </section>

      {/* Gallery Carousel */}
      <section className="max-w-4xl mx-auto mb-16 bg-white rounded-xl shadow-md p-6 text-center">
      <h2 className="text-2xl font-semibold mb-6">Coronation Gallery</h2>
      <div className="relative overflow-hidden">
        <div
          key={currentIndex}
          className={`transition-all duration-500 ease-in-out transform ${
            transitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {galleryItems[currentIndex].type === "image" ? (
            <img
              src={galleryItems[currentIndex].src}
              alt={galleryItems[currentIndex].alt}
              className="w-full h-[520px] object-cover rounded-xl mx-auto shadow-md"
            />
          ) : (
            <video
              controls
              className="w-full h-[520px] object-cover rounded-xl mx-auto shadow-md"
            >
              <source src={galleryItems[currentIndex].src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleChangeItem("prev")}
            className="bg-yellow-700 text-white px-4 py-2 rounded-md hover:bg-yellow-800 transition duration-200"
          >
            Previous
          </button>
          <button
            onClick={() => handleChangeItem("next")}
            className="bg-yellow-700 text-white px-4 py-2 rounded-md hover:bg-yellow-800 transition duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </section>

      {/* Leave a Message Section */}
      <section className="max-w-4xl mx-auto mb-16 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Leave a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            placeholder="Your Message to His Majesty"
            className="w-full px-4 py-2 border rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button
            type="submit"
            className="bg-yellow-700 text-white px-4 py-2 rounded-md hover:bg-yellow-800 transition duration-200"
          >
            Send Message
          </button>
        </form>

        {/* Messages */}
        <div className="mt-6 space-y-2">
          {messages.length > 0 && (
  <div className="mt-6 text-center">
    <div
      key={currentMessageIndex}
      className={`transition-all duration-500 ease-in-out transform ${
        msgTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
      } p-3 bg-yellow-50 border rounded-xl`}
    >
      <p className="font-semibold">{messages[currentMessageIndex].name}:</p>
      <p>{messages[currentMessageIndex].message}</p>
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={() => handleMessageChange("prev")}
        className="bg-yellow-700 text-white px-4 py-1 rounded-md hover:bg-yellow-800 transition"
      >
        Previous
      </button>
      <button
        onClick={() => handleMessageChange("next")}
        className="bg-yellow-700 text-white px-4 py-1 rounded-md hover:bg-yellow-800 transition"
      >
        Next
      </button>
    </div>
  </div>
)}

        </div>
      </section>

      {/* Family Legacy */}
      <section className="max-w-4xl mx-auto mb-16 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Upholding Family Legacy</h2>
        <p>
          From the early days of our ancestors to today, our family has cherished traditions, upheld
          values, and inspired generations. This coronation marks a new chapter in a timeless story.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center text-yellow-900 mt-12 relative z-10">
        © 2025  Igwe Dr. Amanze | Designed with 💛 by [Chinwendu Faustina Achilonu]
      </footer>
    </div>
  );
}
