export default function AdminSidebar() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToUsers = () => {
    window.scrollTo({
      top: document.body.scrollHeight - window.innerHeight - 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="hidden md:block w-64"> {/* Wrapper prevents collapse */}
      <div className="fixed w-64 h-screen bg-gray-900 p-5">
        <h1 className="text-xl font-bold mb-6">Admin</h1>
        <ul className="space-y-3">
          <li
            onClick={scrollToTop}
            className="hover:text-blue-400 cursor-pointer"
          >
            Dashboard
          </li>
          <li
            onClick={scrollToUsers}
            className="hover:text-blue-400 cursor-pointer"
          >
            Users
          </li>
        </ul>
      </div>
    </div>
  );
}