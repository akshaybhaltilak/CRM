import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, get, child, remove } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5ktch5mWZbEZJS4YyWvcQoPmgWmFMK0o",
  authDomain: "construction-crm-98d14.firebaseapp.com",
  databaseURL: "https://ramkrishnanursury-default-rtdb.firebaseio.com/",
  projectId: "construction-crm-98d14",
  storageBucket: "construction-crm-98d14.appspot.com",
  messagingSenderId: "810004838891",
  appId: "1:810004838891:web:60216b1d85bcbcc77e01ae",
  measurementId: "G-XSJ0VXYMTK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to add a new project
const addProject = async (projectData) => {
  try {
    const newProjectRef = push(ref(db, "projects"));
    await set(newProjectRef, projectData);
    return { id: newProjectRef.key, ...projectData };
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

// Function to fetch all projects
const getProjects = async () => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "projects"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// Function to delete a project
const deleteProject = async (projectId) => {
  try {
    await remove(ref(db, `projects/${projectId}`));
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export { db, addProject, getProjects, deleteProject };
