import { getCanvas } from "kontra";
import { CustomButton, OverlayDialog } from "./shared-ui";
import {
  GameManager,
  GameState,
  TemplarClass,
} from "../../managers/game-manager";

export class GameStartDialog extends OverlayDialog {
  constructor() {
    super(360, 180);
    this.titleText.text = "Pick a Class";
    this.descText.text = "Pick a class to fight against enemies";

    const { width: w, height: h } = getCanvas();
    const gm = GameManager.getInstance();
    const wizardButton = new CustomButton(w / 2 - 108, h / 2 + 52, "Wizard");
    const knightButton = new CustomButton(w / 2, h / 2 + 52, "Knight");
    const defenderButton = new CustomButton(
      w / 2 + 108,
      h / 2 + 52,
      "Defender"
    );
    const removeAllEvents = () => {
      wizardButton.offClick();
      knightButton.offClick();
      defenderButton.offClick();
    };

    wizardButton.bindClick(() => {
      gm.setClass(TemplarClass.WIZARD);
      removeAllEvents();
    });
    knightButton.bindClick(() => {
      gm.setClass(TemplarClass.KNIGHT);
      removeAllEvents();
    });
    defenderButton.bindClick(() => {
      gm.setClass(TemplarClass.DEFENDER);
      removeAllEvents();
    });

    this.addChild([wizardButton, knightButton, defenderButton]);
  }

  public render(): void {
    const gm = GameManager.getInstance();
    if (gm.state !== GameState.INIT) return;
    super.render();
  }
}
