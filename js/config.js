/* ============================================================
   EDIT ME — all personal content lives here.
   - Leave a value as "" to HIDE that button/link.
   - Never put tokens, passwords, or API keys here.
   ============================================================ */
window.SITE_CONFIG = {
  name: "Lalit Prajapat",
  profileImage: "", // TODO: e.g. "assets/profile.jpg" — leave "" to keep LP placeholder

  // Contact details — values below are rendered as interactive cards.
  contact: {
    github: "",        // e.g. "https://github.com/your-username"
    discord: "lalit572",
    discordUrl: "",    // optional invite URL — leave "" (no invite fabricated)
    email: "tekkenlalit143@gmail.com",
    youtube: "",       // optional
    linkedin: ""       // optional
  },

  projects: [
    {
      name: "ACR Mod",
      category: "Minecraft Development",
      icon: "⛏️",
      description: "Minecraft project linked from my earlier portfolio. I'm confirming the exact version, features, and repo URL — details will appear here once verified.",
      tags: ["Minecraft", "Java", "TODO: version"],
      repo: "",        // TODO: paste repo URL when public
      demo: "",
      details: "",
      placeholder: true
    },
    {
      name: "Minecraft Forensic Scanner",
      category: "Android Application Development",
      icon: "📱",
      description: "Android app (v2.0.0-forensic, Kotlin + Jetpack Compose) that scans a device for traces left behind after previously used software is removed. Experimental tool for local analysis — not a security suite, no accuracy claims.",
      tags: ["Kotlin", "Jetpack Compose", "Material 3", "Android SDK", "Gradle"],
      repo: "",        // TODO: paste repo URL when public
      demo: "",
      details: "",
      placeholder: false
    },
    {
      name: "Discord Bots & Automation",
      category: "Discord Development",
      icon: "🤖",
      description: "Discord bots, automation scripts, and server-management experiments. Individual bots will be listed here with real features once their code and names are confirmed.",
      tags: ["Discord API", "Automation", "TODO: library"],
      repo: "",
      demo: "",
      details: "",
      placeholder: true
    },
    {
      name: "Minecraft Tools & Utilities",
      category: "Minecraft Development",
      icon: "🧰",
      description: "Explorations around Minecraft mods, client-side tools, and utilities. Only completed items with confirmed versions will be featured here.",
      tags: ["Java", "Fabric (exploring)", "Gradle", "Git"],
      repo: "",
      demo: "",
      details: "",
      placeholder: true
    },
    {
      name: "Developer Portfolio",
      category: "Web Development",
      icon: "🌐",
      description: "This website — a lightweight, responsive portfolio with dark developer styling. Plain HTML, CSS, and JavaScript, no frameworks.",
      tags: ["HTML", "CSS", "JavaScript"],
      repo: "",
      demo: "",
      details: "",
      placeholder: false
    }
  ],

  skills: [
    { title: "Web Development", items: ["HTML", "CSS", "JavaScript"] },
    { title: "Android Development", items: ["Kotlin", "Jetpack Compose", "Material 3", "Android SDK", "Gradle"] },
    { title: "Discord Development", items: ["Discord API", "Automation"] }, // TODO: add verified lib, e.g. "discord.js" / "discord.py"
    { title: "Minecraft Development", items: ["Java", "Gradle", "Git"] },   // TODO: add "Fabric" etc. once confirmed
    { title: "Development Tools", items: ["Git", "GitHub", "Linux", "VS Code", "Android Studio"] }
  ]
};
