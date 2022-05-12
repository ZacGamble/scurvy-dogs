import { dbContext } from "../db/DbContext.js";

class UpgradesService
{
    async addToShip(upgradeId, shipId)
    {
        await dbContext.ShipUpgrades.create({ upgradeId, shipId });
    }
}

export const upgradesService = new UpgradesService();