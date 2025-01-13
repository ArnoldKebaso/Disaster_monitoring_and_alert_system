import React, {useState} from 'react';
const ContactUS: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data successfully submitted");
        // axios to send data to the backend api.

        // axios.post('localhost:3000/contact', formData)
        //     .then(response => console.log(response.data))
        //     .catch(error => console.error(error));
    };

    return(
        <div className= "bg-gray-100 min-h-screen p-8">
            <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-blue-950">
                    Get in touch
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                            Name
                        </label>
                        <input type="text"
                               id="name"
                               value={formData.name}
                               onChange={handleChange}
                               required
                               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="subject">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
                <div className="mt-10 text-center">
                    <h2 className="text-xl font-bold text-blue-900 mb-4">Contact Information</h2>
                    <p>📍 Location: Njoro, Kenya</p>
                    <p>📞 Phone: +254 123 456 789</p>
                    <p>📧 Email: fmas@gmail.com</p>
                </div>

            </div>

        </div>
    );
};