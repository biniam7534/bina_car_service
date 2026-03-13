const mongoose = require('mongoose');

// MongoDB connection string
const mongoURI = 'mongodb+srv://biniambinuu_db_user:PckX2sELGlpdTa7G@cluster0.vowevcf.mongodb.net/?appName=Cluster0';

// connect to MongoDB
mongoose.connect(mongoURI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection failed:", err);
});

module.exports = mongoose;