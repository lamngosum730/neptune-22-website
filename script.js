const CONTACT_EMAIL = "ns.lam@neptune-22.com";

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const modal = document.querySelector("#assistant-modal");
const aiInput = document.querySelector("#ai-input");
const aiOutput = document.querySelector("#ai-output");

function openAssistant() {
  modal.hidden = false;
  aiInput.focus();
}

function closeAssistant() {
  modal.hidden = true;
}

function buildBrief(text) {
  const source = text.trim();
  if (!source) {
    return "Please describe the project first, including survey area, water depth, vessel or USV platform, equipment required, accuracy requirement and schedule.";
  }

  return [
    "Dear Neptune 22,",
    "",
    "I would like to enquire about survey equipment and technical support.",
    "",
    `Project background: ${source}`,
    "",
    "Please advise suitable equipment, rental or purchase options, integration requirements, availability and an estimated quotation.",
    "",
    "Key details to confirm:",
    "- Survey area and approximate water depth",
    "- Vessel or USV platform",
    "- Required sonar, GNSS/INS, LiDAR or data acquisition setup",
    "- Accuracy and deliverable requirements",
    "- Project schedule",
    "",
    "Thank you."
  ].join("\n");
}

function mailBrief(subject, body) {
  const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}

navToggle?.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("[data-open-ai]").forEach((button) => {
  button.addEventListener("click", openAssistant);
});

document.querySelectorAll("[data-close-ai]").forEach((button) => {
  button.addEventListener("click", closeAssistant);
});

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    aiInput.value = button.dataset.prompt;
    aiOutput.textContent = buildBrief(aiInput.value);
  });
});

document.querySelector("[data-generate-brief]")?.addEventListener("click", () => {
  aiOutput.textContent = buildBrief(aiInput.value);
});

document.querySelector("[data-send-brief]")?.addEventListener("click", () => {
  const body = aiOutput.textContent.includes("Dear Neptune 22")
    ? aiOutput.textContent
    : buildBrief(aiInput.value);
  mailBrief("Survey equipment enquiry", body);
});

document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const body = [
    "Dear Neptune 22,",
    "",
    "I would like to submit an enquiry through the website.",
    "",
    `Name: ${form.get("name")}`,
    `Email: ${form.get("email")}`,
    `Project type: ${form.get("project")}`,
    "",
    `Message: ${form.get("message") || "No additional message provided."}`,
    "",
    "Thank you."
  ].join("\n");

  mailBrief("Neptune 22 website enquiry", body);
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeAssistant();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeAssistant();
});
