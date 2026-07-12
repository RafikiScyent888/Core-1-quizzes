// Re-tags QUESTION_BANK entries in ../index.html with a fine-grained
// sub-objective (in addition to the existing broad `domain`), so the
// custom-quiz picker can offer per-sub-objective checkboxes instead of
// just 5 broad domain checkboxes.
//
// This is an informal study-aid taxonomy inspired by the public CompTIA
// A+ Core 1 (220-1201) domain structure; not official CompTIA material.
//
// Run with: node tools/tag-subobjectives.mjs

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const FILE = path.join(ROOT, "index.html");

export const SUB_OBJECTIVES = {
  "Mobile Devices": [
    { id: "1.1", label: "Laptop Hardware & Components" },
    { id: "1.2", label: "Mobile Device Accessories & Ports" },
    { id: "1.3", label: "Mobile Device Connectivity & Networking" },
  ],
  "Networking": [
    { id: "2.1", label: "TCP/IP, Ports & Protocols" },
    { id: "2.2", label: "Networking Devices & Appliances" },
    { id: "2.3", label: "Wireless Networking & Standards" },
    { id: "2.4", label: "SOHO Network Configuration" },
    { id: "2.5", label: "Internet & WAN Connection Types" },
    { id: "2.6", label: "Network Cabling & Connectors" },
  ],
  "Hardware": [
    { id: "3.1", label: "Cables & Connectors" },
    { id: "3.2", label: "RAM & Memory" },
    { id: "3.3", label: "Storage Devices" },
    { id: "3.4", label: "Motherboards, CPUs & Add-on Cards" },
    { id: "3.5", label: "Power Supplies" },
    { id: "3.6", label: "Peripherals & Multifunction/Printers" },
    { id: "3.7", label: "Custom PC Builds & Configurations" },
  ],
  "Virtualization and Cloud Computing": [
    { id: "4.1", label: "Cloud Computing Concepts" },
    { id: "4.2", label: "Client-Side Virtualization" },
  ],
  "Hardware and Network Troubleshooting": [
    { id: "5.1", label: "Troubleshooting Methodology" },
    { id: "5.2", label: "Motherboard, CPU, RAM & Power Issues" },
    { id: "5.3", label: "Storage Troubleshooting" },
    { id: "5.4", label: "Video & Display Troubleshooting" },
    { id: "5.5", label: "Mobile Device Troubleshooting" },
    { id: "5.6", label: "Printer Troubleshooting" },
    { id: "5.7", label: "Wired & Wireless Network Troubleshooting" },
  ],
};

const RULES = {
  "Mobile Devices": [
    ["1.3", /\b(wi-?fi|bluetooth|nfc|cellular|hotspot|airplane mode|gps|pairing|imei|sim|e-?sim|mobile hotspot)\b/i],
    ["1.2", /\b(dock|port replicator|stylus|trackpad accessory|external monitor|game pad|headset|rugged case|screen protector|micro-?usb|usb-?c cable)\b/i],
    ["1.1", /.*/],
  ],
  "Networking": [
    ["2.6", /\b(cat ?[5-8]|coaxial|fiber|rj-?45|rj-?11|patch cable|crossover|straight-through|punch.?down|connector)\b/i],
    ["2.5", /\b(cable modem|dsl|fiber internet|satellite internet|cellular wan|vpn|tethering|wan\b)\b/i],
    ["2.4", /\b(soho|port forwarding|dhcp reservation|firmware update on router|qos\b|upnp|dmz\b|wireless router config)\b/i],
    ["2.3", /\b(wi-?fi|wireless standard|802\.11|ssid|wpa|encryption standard|channel|access point)\b/i],
    ["2.2", /\b(switch|router|access point|firewall appliance|modem|hub\b|patch panel|network card|nic\b|repeater|bridge)\b/i],
    ["2.1", /.*/],
  ],
  "Hardware": [
    ["3.7", /\b(custom (pc|build|configuration)|gaming pc|workstation build|home theater pc|thin client build)\b/i],
    ["3.6", /\b(printer|multifunction|toner|inkjet|thermal printer|3d printer|scanner|imaging drum|fuser)\b/i],
    ["3.5", /\b(power supply|psu\b|wattage|80 plus|modular power)\b/i],
    ["3.4", /\b(motherboard|cpu\b|processor|socket|add-on card|expansion card|bios|uefi|chipset|heat sink|cooling)\b/i],
    ["3.3", /\b(hdd|ssd|nvme|m\.2|sata|optical drive|hard drive|solid state|raid|storage device)\b/i],
    ["3.2", /\b(ram\b|memory (module|stick)|ddr[2-5]|so-?dimm|dimm\b)\b/i],
    ["3.1", /\b(cable|connector|adapter|displayport|hdmi|vga|usb\b|thunderbolt)\b/i],
    ["3.4", /.*/],
  ],
  "Virtualization and Cloud Computing": [
    ["4.2", /\b(hypervisor|type 1|type 2|virtual machine|vm\b|client-side virtualization|vmware|virtualbox|hyper-v)\b/i],
    ["4.1", /.*/],
  ],
  "Hardware and Network Troubleshooting": [
    ["5.7", /\b(wireless connectivity issue|no internet|wi-?fi (drop|issue)|network connectivity|slow network|intermittent connectivity|limited connectivity|aps? issue)\b/i],
    ["5.6", /\b(printer|toner|paper jam|print quality|spooler)\b/i],
    ["5.5", /\b(laptop|tablet|smartphone|mobile device).{0,40}(troubleshoot|issue|problem|won'?t|not charging|overheat)/i],
    ["5.4", /\b(display|monitor|screen|video|no image|dim display|flickering|artifact(s|ing)?)\b/i],
    ["5.3", /\b(storage|drive not detected|clicking noise|slow read|s\.?m\.?a\.?r\.?t\.?|raid fail|boot device)\b/i],
    ["5.2", /\b(motherboard|cpu|ram|memory|power (issue|supply|problem)|no power|post\b|beep code|overheating)\b/i],
    ["5.1", /\b(troubleshooting methodology|establish a theory|identify the problem|document findings|escalate)\b/i],
    ["5.1", /.*/],
  ],
};

function classify(q) {
  const rules = RULES[q.domain];
  const haystack = `${q.q} ${q.choices.join(" ")} ${q.explain || ""}`;
  for (const [id, re] of rules) {
    if (re.test(haystack)) return id;
  }
  return rules[rules.length - 1][0];
}

function main() {
  const text = readFileSync(FILE, "utf8");
  const startTag = '<script id="question-data" type="application/json">';
  const start = text.indexOf(startTag);
  const jsonStart = start + startTag.length;
  const jsonEnd = text.indexOf("</script>", jsonStart);
  const bank = JSON.parse(text.slice(jsonStart, jsonEnd));

  const counts = {};
  bank.forEach((q) => {
    q.sub = classify(q);
    counts[q.sub] = (counts[q.sub] || 0) + 1;
  });

  console.log(`Tagged ${bank.length} questions.`);
  for (const [domain, subs] of Object.entries(SUB_OBJECTIVES)) {
    console.log(domain);
    subs.forEach((s) => console.log(`  ${s.id} ${s.label.padEnd(40)} ${counts[s.id] || 0}`));
  }

  const newJson = JSON.stringify(bank);
  const newText = text.slice(0, jsonStart) + newJson + text.slice(jsonEnd);
  writeFileSync(FILE, newText);
  console.log("\nWrote updated index.html");
}

main();
