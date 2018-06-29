import React from 'react';

// export default () => {
//   return (
//     <footer className="bg-dark text-white mt-5 p-4 text-center">
//       Copyright &copy; {new Date().getFullYear()} Baanda
//     </footer>
//   )
// }
//   <footer class="container-fluid ">
export default () => {
  return (
    <footer>
      <nav className="navbar fixed-bottom navbar-dark bg-dark text-white">
        <div className="d-flex align-content-center flex-wrap">
          Copyright &copy; {new Date().getFullYear()} Baand
        </div>
      </nav>
    </footer>
  );
};
