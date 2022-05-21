import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  boss: null,
  currentHistory: {},
  account: {},
  lobbies: [],
  currentLobby: {},
  ships: [],
  lobbyShips: [],
  activeShip: null,
  userShips: []
})
