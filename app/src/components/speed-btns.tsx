import type MxPlugin from "@/mx-main";

export function SpeedBtns({plugin}: {plugin: MxPlugin}) {
  const speedOptions = plugin.settings.getState().speedOptions
  return (
    <div className="mx-speed-btns">
      {speedOptions.map((speed) => (
        <button
          key={speed}
          onClick={async () => {
            await plugin.app.commands.executeCommandById(`media-ex:set-speed-${speed}x`)
          }}
        >
          {speed}x
        </button>
      ))}
    </div>
  );
}