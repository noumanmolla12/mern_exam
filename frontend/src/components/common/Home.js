import React from 'react';

const ExamHome = () => {
  const subjects = [
    { title: "Web Development", emoji: "💻", description: "HTML, CSS, JS, React" },
    { title: "Data Structures", emoji: "🧠", description: "Master sorting, trees & graphs" },
    { title: "Database", emoji: "🗄️", description: "SQL, MongoDB, indexing, joins" },
    { title: "Networking", emoji: "🌐", description: "OSI model, TCP/IP, HTTP" },
    { title: "Cybersecurity", emoji: "🔐", description: "Ethical hacking, cryptography" },
    { title: "AI & ML", emoji: "🤖", description: "Neural networks, data science" },
    { title: "OS Concepts", emoji: "🧩", description: "Processes, threads, memory mgmt" },
    { title: "Mobile Dev", emoji: "📱", description: "Android, Flutter, iOS basics" },
    { title: "Cloud Computing", emoji: "☁️", description: "AWS, Azure, GCP" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 flex items-center justify-center px-4 py-12">
      <div className="text-white text-center space-y-6 max-w-7xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold animate-pulse drop-shadow-xl">
          🎓 Smart Exam Portal
        </h1>
        <p className="text-lg md:text-xl text-gray-200 font-medium">
          Your gateway to success — practice, progress, and perform.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 shadow-lg h-full flex flex-col justify-between hover:-translate-y-2 hover:scale-105 hover:shadow-2xl transition duration-300"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <div className="text-5xl mb-2">{subject.emoji}</div>
              <h3 className="text-xl font-bold text-white mb-1">{subject.title}</h3>
              <p className="text-sm text-gray-100">{subject.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamHome;
