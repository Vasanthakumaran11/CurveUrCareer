import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-slate-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">CurveUrCareer</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/assessment" className="nav-link">Assessment</Link>
        <Link to="/results" className="nav-link">Results</Link>
        <a href="#" className="nav-link">About</a>
      </div>
    </nav>
  );
};

export default Navbar;
