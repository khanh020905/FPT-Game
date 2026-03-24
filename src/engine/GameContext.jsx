/**
 * Game Context — Central state management with React Context + useReducer
 */

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { gameReducer, initialState } from "./gameReducer";

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Auto-clear notifications after 3 seconds
  useEffect(() => {
    if (state.notifications.length > 0) {
      const timer = setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION",
          payload: state.notifications[0]?.id,
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.notifications]);

  const newGame = useCallback(
    (playerInfo) => dispatch({ type: "NEW_GAME", payload: playerInfo }),
    [],
  );

  const loadGame = useCallback(() => {
    const saved = localStorage.getItem("fpt-game-save");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        dispatch({ type: "LOAD_GAME", payload: data });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }, []);

  const saveGame = useCallback(() => dispatch({ type: "SAVE_GAME" }), []);

  const moveTo = useCallback(
    (locationId) => dispatch({ type: "MOVE_TO", payload: locationId }),
    [],
  );

  const performAction = useCallback(
    (actionId) => dispatch({ type: "PERFORM_ACTION", payload: actionId }),
    [],
  );

  const applyEvent = useCallback(
    (effects) => dispatch({ type: "APPLY_EVENT", payload: effects }),
    [],
  );

  const dismissEvent = useCallback(
    () => dispatch({ type: "DISMISS_EVENT" }),
    [],
  );

  const buyItem = useCallback(
    (itemId) => dispatch({ type: "BUY_ITEM", payload: itemId }),
    [],
  );

  const useItem = useCallback(
    (itemId) => dispatch({ type: "USE_ITEM", payload: itemId }),
    [],
  );

  const openSystem = useCallback(
    (systemId) => dispatch({ type: "OPEN_SYSTEM", payload: systemId }),
    [],
  );

  const closeSystem = useCallback(() => dispatch({ type: "CLOSE_SYSTEM" }), []);

  const hasSave = useCallback(() => {
    return !!localStorage.getItem("fpt-game-save");
  }, []);

  const updatePlayerPos = useCallback(
    (x, y) => dispatch({ type: "UPDATE_PLAYER_POS", payload: { x, y } }),
    [],
  );

  const canvasInteract = useCallback(
    () => dispatch({ type: "CANVAS_INTERACT" }),
    [],
  );

  const value = {
    state,
    dispatch,
    newGame,
    loadGame,
    saveGame,
    moveTo,
    performAction,
    applyEvent,
    dismissEvent,
    buyItem,
    useItem,
    openSystem,
    closeSystem,
    hasSave,
    updatePlayerPos,
    canvasInteract,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

export default GameContext;
