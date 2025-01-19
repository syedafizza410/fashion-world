import Image from "next/image";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* Header Section */}
      <div className="bg-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Contact Us</h1>
          <p className="text-sm text-gray-600">
            Home . Pages . <span className="text-pink-500">Contact us</span>
          </p>
        </div>
      </div>

      {/* Information Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Form */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Get In Touch</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            We would love to hear from you! Whether you have a question, feedback, or just want to say hello,
            our team is here to assist you. You can reach out to us via email, phone, or by filling out our contact form on the website.
          </p>

          {/* Form */}
          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name*"
                className="w-full border rounded-md p-4 text-sm focus:outline-none focus:ring-pink-500"
              />
              <input
                type="email"
                placeholder="Your E-mail"
                className="w-full border rounded-md p-4 text-sm focus:outline-none focus:ring-pink-500"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border rounded-md p-4 text-sm focus:outline-none focus:ring-pink-500"
            />
            <textarea
              placeholder="Type Your Message*"
              rows={5}
              className="w-full border rounded-md p-4 text-sm focus:outline-none focus:ring-pink-500"
            ></textarea>
            <button className="px-6 py-3 bg-pink-500 text-white font-medium rounded-md hover:bg-pink-600">
              Send Mail
            </button>
          </form>
        </div>

        {/* Right Section - Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-900">Contact Way</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              <p className="text-gray-600">Tel: +12043334556</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
              <p className="text-gray-600">E-Mail: eucfashionworld@gmail.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              <p className="text-gray-600">
                Sioux Lookout, Ontario, Canada
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              <p className="text-gray-600">
                Free standard shipping <br /> on all orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center mt-16">
        <Image
          src="/contact.png" // Replace this with your actual image path
          alt="Contact Us Illustration"
          height={692}
          width={723}
          className="w-full max-w-md rounded-full shadow-lg"
        />
      </div>
    </div>
  );
}
