import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Welcome to My App</h1>
        <button onClick={() => navigate('/users')} className="bg-blue-500 mt-4 text-white font-bold py-2 px-4 rounded-3xl hover:bg-blue-700 cursor-pointer">
          Users
        </button>
      </div>
    </>
  );
}

export default App;
