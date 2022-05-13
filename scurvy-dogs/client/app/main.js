import { AuthController } from './Controllers/AuthController.js'

class App {
  authController = new AuthController();
}

// @ts-ignore
window.app = new App()
