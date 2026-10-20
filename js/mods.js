/* ============================================================
   MINECRAFT MODS DATA — edit here to add/remove mods.

   To add a mod:
   1. Drop the .jar file into the  downloads/  folder
   2. Copy one entry below and fill it in

   Fields:
     name        display name
     description short honest description
     version     mod version (from its fabric.mod.json)
     mc          supported Minecraft version(s)
     loader      e.g. "Fabric"
     loaderMin   minimum loader version ("" if unknown)
     deps        required dependencies (array of strings)
     recommends  optional/recommended dependencies (array)
     features    feature tags (only confirmed ones)
     file        relative path to the jar  (must match a real file)
     fileForced  download attribute filename (optional; uses file's name if omitted)
     size        file size text (update when you replace the jar)
     notes       optional extra line shown in the card

   Rules:
   - Never invent compatibility. If a field is unknown, write "TODO: confirm".
   - Remove this comment block's guidance only if you like it. :)
   ============================================================ */
window.MODS = [
  {
    name: "AMR – Auto Chat Reply",
    description:
      "A client-side Minecraft mod that recognizes and solves supported server chat games, including basic math, exact-copy challenges, word unscrambling, and trivia questions. It supports Auto mode with a two-second delay and Manual mode using the Z key. Question solving is performed locally.",
    version: "1.0.1",
    mc: "1.21.11",
    loader: "Fabric",
    loaderMin: "0.18.0",
    deps: ["Fabric API", "Fabric Loader", "Java 21 or newer"],
    recommends: [],
    features: [
      "Chat Game Solver",
      "Math Questions",
      "Word Unscrambling",
      "Trivia",
      "Auto and Manual Modes"
    ],
    file: "downloads/amr-auto-chat-reply-1.0.1.jar",
    fileForced: "amr-auto-chat-reply-1.0.1.jar",
    size: "78 KB",
    notes: "Solves only the chat game formats implemented in this mod — not every server or every chat game."
  },
  {
    name: "Held Item Name Remover",
    description:
      "A lightweight client-side mod that hides the held-item name text normally displayed above the hotbar when you switch items. It removes that specific HUD text without intentionally changing other HUD elements or gameplay.",
    version: "1.0.0",
    mc: "1.21.11",
    loader: "Fabric",
    loaderMin: "0.18.1",
    deps: ["Java 21 or newer"],
    recommends: [],
    features: ["HUD Customization", "Clean Interface", "Client-Side Mod"],
    file: "downloads/held-item-name-remover-1.0.0.jar",
    fileForced: "held-item-name-remover-1.0.0.jar",
    size: "1.3 MB",
    notes: ""
  },
  {
    name: "Piglin FPS Optimizer",
    description:
      "A client-side rendering optimization mod designed for Minecraft worlds with large piglin populations, particularly piglin bartering farms. It offers configurable rendering optimizations, including distance and crowd level-of-detail options and a forced 2D billboard rendering mode. These features are intended to reduce rendering overhead when many piglins are present.",
    version: "1.0.0",
    mc: "1.21.11",
    loader: "Fabric",
    loaderMin: "0.19.0",
    deps: ["Fabric API", "Java 21 or newer"],
    recommends: ["Sodium 0.8.14 or newer"],
    features: [
      "Piglin Rendering Optimization",
      "Distance-Based LOD",
      "Crowd-Based LOD",
      "2D Billboard Mode",
      "Configurable Rendering"
    ],
    file: "downloads/piglin-fps-optimizer-1.0.0.jar",
    fileForced: "piglin-fps-optimizer-1.0.0.jar",
    size: "28 KB",
    notes: "No FPS increase is guaranteed — performance depends on your PC, Minecraft settings, farm size, and other mods."
  }
];
