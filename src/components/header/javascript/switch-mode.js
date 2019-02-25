export function toggleDarkLight() {
  console.log('chamou o toggle func!');
  const container = document.getElementById("app-container");
  const currentClass = container.className;
  container.className = currentClass === "dark-mode" ? "light-mode" : "dark-mode";
}