import React from "react";
import "./Sidebar.css";
import icon1 from "./icon1.jpg";
import icon2 from "./icon2.jpg";
import icon3 from "./icon3.jpg";
import icon4 from "./icon4.jpg";

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <ul>
//         <li>
//           <a href="#">
//             <img src={icon1} alt="Icon 1" />
//           </a>
//         </li>
//         <li>
//           <a href="#">
//             <img src={icon2} alt="Icon 2" />
//           </a>
//         </li>
//         <li>
//           <a href="#">
//             <img src={icon3} alt="Icon 3" />
//           </a>
//         </li>
//         <li>
//           <a href="#">
//             <img src={icon4} alt="Icon 4" />
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        5<br />
        Team
      </div>
      {/* Add additional sidebar items here */}
    </div>
  );
};

export default Sidebar;
