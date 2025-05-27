import type { MediaPlayerInstance } from "@vidstack/react";
import type { MenuItem } from "obsidian";
import { PlaybackSpeedPrompt } from "./prompt";

export const speedOptions = [.25,.5,.8,1,1.2,1.5,2,2.5,3,3.5,4,6,8];

export function speedMenu(item: MenuItem, player: MediaPlayerInstance) {
  const currentSpeed = player.state.playbackRate;

  const isCustomSpeed = !speedOptions.includes(currentSpeed);

  const sub = item
    .setTitle(speedLabel(currentSpeed))
    .setIcon("gauge")
    .setSection("mx-player")
    .setSubmenu();
  speedOptions.forEach((speed) =>
    sub.addItem((item) =>
      item
        .setTitle(`${speed}x`)
        .setChecked(speed === currentSpeed)
        .onClick(() => {
          player.playbackRate = speed;
        }),
    ),
  );
  sub.addItem((item) =>
    item
      .setTitle(customSpeedLabel(currentSpeed))
      .setChecked(isCustomSpeed)
      .onClick(async () => {
        const newSpeed = await PlaybackSpeedPrompt.run();
        if (!newSpeed) return;
        player.playbackRate = newSpeed;
      }),
  );
}

function speedLabel(speed: number) {
  const speedLabel = new DocumentFragment();
  speedLabel.appendText("Speed ");
  speedLabel.createEl("code", { text: `(${speed}x)` });
  return speedLabel;
}

function customSpeedLabel(speed: number) {
  const customSpeedLabel = new DocumentFragment();
  customSpeedLabel.appendText("Custom");
  if (!speedOptions.includes(speed)) {
    customSpeedLabel.appendText(" ");
    customSpeedLabel.createEl("code", { text: `(${speed}x)` });
  } else {
    customSpeedLabel.appendText("...");
  }
  return customSpeedLabel;
}
