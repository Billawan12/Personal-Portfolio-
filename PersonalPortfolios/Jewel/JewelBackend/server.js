const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai'); // Import OpenAI library

const app = express();
const PORT = 5502; // Backend port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI Client Setup
const openai = new OpenAI({
    apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your OpenAI API Key
});

// Chatbot Route
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    // Handle Portfolio-related Queries
    if (message.toLowerCase().includes('portfolio') || message.toLowerCase().includes('projects')) {
        res.json({
            reply: "My portfolio showcases a variety of web development projects. Some of my key projects include:\n" +
                "1. **Online Shopping Platform**: A full-stack e-commerce site built with React, Node.js, and MongoDB.\n" +
                "2. **Law Firm Website**: A professional website for a law firm, designed with a focus on user experience, built using HTML, CSS, and JavaScript.\n" +
                "3. **Restaurant Website**: A modern, responsive website for a restaurant featuring an online menu and reservation system.\n" +
                "You can find more details in the 'Projects' section of the portfolio!"
        });
        return;
    }

    // Skills-related Query
    if (message.toLowerCase().includes('skills') || message.toLowerCase().includes('technologies')) {
        res.json({
            reply: "I have expertise in both frontend and backend development. Some of my core skills include:\n" +
                "1. **Frontend**: HTML5, CSS3, JavaScript (ES6+), React, Angular, Bootstrap, Tailwind CSS.\n" +
                "2. **Backend**: Node.js, Express, Python, MongoDB, SQL.\n" +
                "3. **Version Control**: Git, GitHub.\n" +
                "4. **Others**: Responsive Design, RESTful APIs, Web Accessibility, Agile Development, and more!"
        });
        return;
    }

    // Work Experience Query
    if (message.toLowerCase().includes('experience') || message.toLowerCase().includes('work') || message.toLowerCase().includes('job')) {
        res.json({
            reply: "I have gained experience in various roles over the years. Some of my key positions include:\n" +
                "1. **Content Creator (2020-Present)**: I create and share content about web development and software technologies, focusing on tutorials and tips.\n" +
                "2. **Digital Marketer (2018-2020)**: I worked with businesses to create and implement digital marketing strategies, including building websites for online marketing.\n" +
                "3. **Chamber of Commerce (2013-2018)**: I worked with local businesses, assisting with online presence and web strategies."
        });
        return;
    }

    // Resume-related Query
    if (message.toLowerCase().includes('resume') || message.toLowerCase().includes('cv') || message.toLowerCase().includes('download')) {
        res.json({
            reply: "You can download my resume by clicking the 'Download Resume' button in the Hero section of the portfolio or directly [here](./JewelAssets/Sample_Resume_Template.pdf)."
        });
        return;
    }

    // Specific Project Query: Online Shopping Platform
    if (message.toLowerCase().includes('online shopping platform') || message.toLowerCase().includes('e-commerce project')) {
        res.json({
            reply: "The **Online Shopping Platform** I developed is a full-stack e-commerce website built using React for the frontend and Node.js for the backend.\n" +
                "Features:\n" +
                "1. Product Listings with filtering options.\n" +
                "2. Shopping Cart with user authentication.\n" +
                "3. Integration with payment gateways (Stripe).\n" +
                "4. Admin dashboard for managing orders and inventory.\n" +
                "Technologies used: React, Node.js, Express, MongoDB, Stripe API."
        });
        return;
    }

    // Specific Project Query: Law Firm Website
    if (message.toLowerCase().includes('law firm website')) {
        res.json({
            reply: "The **Law Firm Website** I built is a professional website aimed at providing legal services to clients. I focused on a clean, modern design and user-friendly navigation.\n" +
                "Features include:\n" +
                "1. Service descriptions with case studies.\n" +
                "2. Contact forms for consultation requests.\n" +
                "3. Custom blog for legal advice articles.\n" +
                "Technologies used: HTML, CSS, JavaScript, PHP (for form handling)."
        });
        return;
    }

    // Specific Project Query: Restaurant Website
    if (message.toLowerCase().includes('restaurant website')) {
        res.json({
            reply: "The **Restaurant Website** I developed offers a digital menu and reservation system, helping customers browse food options and book reservations easily.\n" +
                "Features include:\n" +
                "1. Digital menu with categorized items.\n" +
                "2. Reservation system with available time slots.\n" +
                "3. Integration with Google Maps for location.\n" +
                "Technologies used: HTML, CSS, JavaScript, Google Maps API."
        });
        return;
    }

    // Use OpenAI for general conversations (fallback)
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'text-davinci-003', // You can use 'gpt-3.5-turbo' as well
            messages: [{ role: 'user', content: message }],
        });
        res.json({ reply: chatCompletion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});