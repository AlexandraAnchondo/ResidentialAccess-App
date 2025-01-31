// import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

// export default function Footer() {
//     return (
//         <footer
//             style={{
//                 "--s": "20px", // Tamaño del patrón
//                 "--p": "at 45% 40%,#0000 75%,",
//                 "--g1": "conic-gradient(var(--p)#0778a1 0)",
//                 "--g2": "conic-gradient(var(--p)#00a8cc 0)",
//                 background: `
//                 var(--g1), var(--g2) calc(2*var(--s)) 0,
//                 var(--g2) calc(3*var(--s)) var(--s),
//                 var(--g1) var(--s) var(--s)rgb(38, 40, 41)
//             `,
//                 backgroundSize: "calc(4*var(--s)) calc(2*var(--s))",
//                 color: "white",
//                 padding: "20px",
//                 textAlign: "center",
//                 position: "relative",
//             }}
//         >
//             <div className="absolute inset-0 bg-black opacity-50"></div>
//             <div className="relative container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
//                 {/* Redes Sociales */}
//                 {/* <div className="flex space-x-6 text-xl">
//                     <a href="#" className="hover:text-blue-400 transition">
//                         <FaFacebook />
//                     </a>
//                     <a href="#" className="hover:text-pink-400 transition">
//                         <FaInstagram />
//                     </a>
//                     <a href="#" className="hover:text-blue-300 transition">
//                         <FaTwitter />
//                     </a>
//                 </div> */}

//                 {/* Derechos de autor */}
//                 <div className="text-center md:text-right text-sm opacity-80 mt-4 md:mt-0">
//                     <p>&copy; {new Date().getFullYear()} AR Access. Todos los derechos reservados.</p>
//                 </div>
//             </div>
//         </footer>
//     );
// }