// import React, { useState, useRef } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// const QRGenerator = () => {
//   const [text, setText] = useState("");
//   const [qrColor, setQrColor] = useState("#000000");
//   const [bgColor, setBgColor] = useState("#ffffff");
//   const [size, setSize] = useState(256);
//   const qrRef = useRef(null);

//   const downloadQR = () => {
//     const canvas = qrRef.current.querySelector("canvas");
//     const url = canvas.toDataURL("image/png");
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "qrcode.png";
//     a.click();
//   };

//   return (
//     <div style={{
//       textAlign: "center",
//       padding: "20px",
//       fontFamily: "Arial, sans-serif",
//       background: "linear-gradient(135deg, #1e3c72, #2a5298)",
//       height: "100vh",
//       width: "100vw",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#fff",
//       zIndex: "20"
//     }}>
//       <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>QR Code Generator</h2>
//       <input
//         type="text"
//         placeholder="Enter text or link"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         style={{
//           padding: "12px",
//           width: "80%",
//           maxWidth: "400px",
//           margin: "10px 0",
//           borderRadius: "8px",
//           border: "none",
//           fontSize: "16px",
//           outline: "none",
//           zIndex: "20",
//           boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
//           textAlign: "center"
//         }}
//       />
//       <div style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "10px",
//         zIndex: "20",
//         marginBottom: "10px"
//       }}>
//         <div>
//           <label style={{ marginRight: "10px",zIndex: "20" }}>QR Color:</label>
//           <input type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} />
//         </div>
//         <div>
//           <label style={{ marginRight: "10px",zIndex: "20" }}>Background Color:</label>
//           <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
//         </div>
//         <div>
//           <label>Size:</label>
//           <input 
//             type="range" 
//             min="128" 
//             max="512" 
//             step="8" 
//             value={size} 
//             onChange={(e) => setSize(parseInt(e.target.value))} 
//           />
//           <span> {size}px</span>
//         </div>
//       </div>
//       <div
//         ref={qrRef}
//         style={{
//           display: "inline-block",
//           padding: "15px",
//           background: "#fff",
//           zIndex: "20",
//           borderRadius: "12px",
//           boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
//           transition: "transform 0.2s",
//         }}
//       >
//         {text && (
//           <QRCodeCanvas 
//             value={text} 
//             size={size} 
//             fgColor={qrColor} 
//             bgColor={bgColor} 
//             level="H" 
//             includeMargin={true} 
//           />
//         )}
//       </div>
//       <button
//         onClick={downloadQR}
//         style={{
//           padding: "12px 20px",
//           margin: "15px 0",
//           border: "none",
//           borderRadius: "8px",
//           zIndex: "20",
//           background: "#ff5722",
//           color: "#fff",
//           fontSize: "16px",
//           cursor: "pointer",
//           transition: "background 0.3s ease",
//         }}
//         onMouseOver={(e) => (e.target.style.background = "#e64a19")}
//         onMouseOut={(e) => (e.target.style.background = "#ff5722")}
//       >
//         Download QR
//       </button>
//     </div>
//   );
// };

// export default QRGenerator;






import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRGenerator = () => {
  const [text, setText] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const qrRef = useRef(null);

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  const presetColors = ["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];

  return (
    <div style={{
      textAlign: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    //   background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      zIndex: "20"
    }}>
      <h2 style={{ fontSize: "32px", marginBottom: "15px", fontWeight: "bold", textTransform: "uppercase",zIndex: "20" }}>QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter text or link"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "12px",
          width: "80%",
          maxWidth: "400px",
          margin: "10px 0",
          borderRadius: "10px",
          border: "none",
          zIndex: "20",
          fontSize: "16px",
          outline: "none",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          textAlign: "center"
        }}
      />
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        zIndex: "20",
        marginBottom: "15px"
      }}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",zIndex: "20"}}>
          <label style={{ marginRight: "10px", fontWeight: "bold",zIndex: "20" }}>QR Color:</label>
          {presetColors.map((color) => (
            <button key={color} style={{ background: color, width: "25px", height: "25px", margin: "5px", border: "2px solid #fff", borderRadius: "50%", cursor: "pointer" }} onClick={() => setQrColor(color)}></button>
          ))}
          <input type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} style={{cursor: "pointer", width: "60px", height: "35px", background: "none", borderRadius: "20px" }} />
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>Background Color:</label>
          {presetColors.map((color) => (
            <button key={color} style={{ background: color, width: "25px", height: "25px", margin: "5px", border: "2px solid #fff", borderRadius: "50%", cursor: "pointer" }} onClick={() => setBgColor(color)}></button>
          ))}
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{cursor: "pointer", width: "60px", height: "35px", background: "none", borderRadius: "20px"  }} />
        </div>
        <div>
          <label style={{ fontWeight: "bold" }}>Size:</label>
          <input 
            type="range" 
            min="128" 
            max="512" 
            step="8" 
            value={size} 
            onChange={(e) => setSize(parseInt(e.target.value))} 
          />
          <span> {size}px</span>
        </div>
      </div>
      <div
        ref={qrRef}
        style={{
          display: "inline-block",
          padding: "15px",
          background: "#fff",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
          transition: "transform 0.2s",
        }}
      >
        {text && (
          <QRCodeCanvas 
            value={text} 
            size={size} 
            fgColor={qrColor} 
            bgColor={bgColor} 
            level="H" 
            includeMargin={true} 
          />
        )}
      </div>
      <button
        onClick={downloadQR}
        style={{
          padding: "14px 22px",
          margin: "20px 0",
          border: "none",
          borderRadius: "10px",
          background: "#ff5722",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background 0.3s ease, transform 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.background = "#e64a19";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#ff5722";
          e.target.style.transform = "scale(1)";
        }}
      >
        Download QR
      </button>
    </div>
  );
};

export default QRGenerator; 