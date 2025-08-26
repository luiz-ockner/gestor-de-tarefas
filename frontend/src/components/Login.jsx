import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Erro ao fazer login. Tente novamente');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Senha</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          type="submit"
        >
          Entrar
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Não tem uma conta?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Cadastre-se
        </a>
      </p>
    </div>
  );
};

export default Login;
