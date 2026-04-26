import { createContext, useContext, useReducer, useEffect } from "react";
import { INITIAL_MEMBERS, DATA_VERSION } from "../data/initialData";

const FamilyContext = createContext();

const STORAGE_KEY = "modi_family_data";
const VERSION_KEY = "modi_family_version";

function loadFromStorage() {
  try {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (storedVersion !== String(DATA_VERSION)) {
      // Data version changed — clear old data
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("sharma_family_data"); // clear old key
      localStorage.setItem(VERSION_KEY, String(DATA_VERSION));
      return null;
    }
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.warn("Failed to load family data:", e);
  }
  return null;
}

function saveToStorage(members) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  } catch (e) {
    console.warn("Failed to save family data:", e);
  }
}

function familyReducer(state, action) {
  switch (action.type) {
    case "ADD_MEMBER":
      return [...state, action.payload];
    case "EDIT_MEMBER":
      return state.map((m) =>
        m.id === action.payload.id ? { ...m, ...action.payload } : m
      );
    case "DELETE_MEMBER":
      return state.filter((m) => m.id !== action.payload);
    case "SET_PHOTO":
      return state.map((m) =>
        m.id === action.payload.id ? { ...m, photo: action.payload.photo } : m
      );
    case "RESET":
      return [...INITIAL_MEMBERS];
    default:
      return state;
  }
}

export function FamilyProvider({ children }) {
  const stored = loadFromStorage();
  const [members, dispatch] = useReducer(
    familyReducer,
    stored || INITIAL_MEMBERS
  );

  useEffect(() => {
    saveToStorage(members);
  }, [members]);

  const addMember = (member) => dispatch({ type: "ADD_MEMBER", payload: member });
  const editMember = (member) => dispatch({ type: "EDIT_MEMBER", payload: member });
  const deleteMember = (id) => dispatch({ type: "DELETE_MEMBER", payload: id });
  const setPhoto = (id, photo) => dispatch({ type: "SET_PHOTO", payload: { id, photo } });
  const resetData = () => dispatch({ type: "RESET" });

  return (
    <FamilyContext.Provider
      value={{ members, addMember, editMember, deleteMember, setPhoto, resetData }}
    >
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const ctx = useContext(FamilyContext);
  if (!ctx) throw new Error("useFamily must be used within FamilyProvider");
  return ctx;
}
