
import { Vector3 } from "fivem-js";

const respawnCoords: Vector3 = new Vector3(705.23, 253.99, 93.19);

let showText: boolean = false;

function DrawRespawnText(): void {
	SetTextFont(0);
	SetTextScale(0.4, 0.4);
	SetTextColour(255, 255, 255, 255); // White
	SetTextEdge(2, 0, 0, 0, 255);
	SetTextOutline();
	SetTextCentre(true);
	SetTextEntry("STRING");
	AddTextComponentString("~r~Press ~w~[E] ~r~to respawn or ~w~[R]~r~ to revive.\nRemeber to remain in character.");
	DrawText(0.5, 0.85);
}

function DeathScreen(): void {
	const [x, y, z] = GetEntityCoords(PlayerPedId(), false);
	const coords: Vector3 = new Vector3(x, y, z);

	if (IsEntityDead(PlayerPedId())) {
		showText = true;
		if (IsControlJustPressed(0, 38)) {
			showText = false;
			SetEntityHealth(PlayerPedId(), 200);
			SetEntityCoords(PlayerPedId(), respawnCoords.x, respawnCoords.y, respawnCoords.z, false, false, false, false);
			// clean the players clothes
			ClearPedBloodDamage(PlayerPedId());
		} else if (IsControlJustPressed(0, 140)) {
			showText = false;
			SetEntityHealth(PlayerPedId(), 200);
			SetEntityCoords(PlayerPedId(), coords.x, coords.y, coords.z, false, false, false, false);
			// clean players clothes
			ClearPedBloodDamage(PlayerPedId());
		}
	}
}

setTick(() => {
	DeathScreen();
	if (showText) {
		DrawRespawnText();
	}
});