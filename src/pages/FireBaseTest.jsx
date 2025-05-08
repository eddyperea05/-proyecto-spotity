import React, { useEffect } from "react";
import { auth } from "../firebase";

const FirebaseTest = () => {
  useEffect(() => {
    if (auth) {
      console.log("✅ Firebase Auth is ready:", auth);
    } else {
      console.error("❌ Firebase Auth not available");
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">🔥 Firebase Test</h1>
      <p>Check the console to verify the Firebase connection.</p>
    </div>
  );
};

export default FirebaseTest;
