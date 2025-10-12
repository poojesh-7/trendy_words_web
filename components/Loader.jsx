// import "./Loader.css";
// const Loader = () => {
//   return (
//     <div className="w-full h-[500px] mt-[200px]">
//       <div className="cube-loader">
//         <div className="cube-top"></div>
//         <div className="cube-wrapper">
//           <span style="--i:0" className="cube-span"></span>
//           <span style="--i:1" className="cube-span"></span>
//           <span style="--i:2" className="cube-span"></span>
//           <span style="--i:3" className="cube-span"></span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Loader;

import "./Loader.css";
const Loader = () => {
  return (
    <div className="w-full h-[500px] mt-[200px] flex items-center justify-center">
      <div
        className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
