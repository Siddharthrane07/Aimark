import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import AppRoutes from './routes';
import { NetworkStatus } from './components/NetworkStatus';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      transition: {
        type: "spring",
        mass: 0.3
      }
    },
    ring: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      transition: {
        type: "spring",
        mass: 0.7
      }
    }
  };

  return (
    <Router>
      <div className="relative">
        <motion.div
          className="custom-cursor"
          variants={variants}
          animate="default"
        >
          <div className="cursor-dot" />
        </motion.div>
        <motion.div
          className="cursor-ring"
          variants={variants}
          animate="ring"
        />
        
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <NetworkStatus />
      </div>
    </Router>
  );
}

export default App