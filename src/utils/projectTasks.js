export const getTeamKey = (team = {}) => {
  return `plank-project-tasks:${team.id ?? team.code ?? team.teamCode ?? team.title ?? "unknown"}`;
};

export const normalizeTasks = (tasks = []) => {
  return tasks.map((task, index) => ({
    id: task.id ?? Date.now() + index,
    title: task.title ?? task.text ?? "",
    assigneeId: task.assigneeId ?? task.assignee?.id ?? "",
    assigneeName: task.assigneeName ?? task.assignee?.name ?? "",
    checked: Boolean(task.checked ?? task.done ?? task.completed),
  })).filter((task) => task.title.trim());
};

export const loadProjectTasks = (team = {}) => {
  try {
    const saved = localStorage.getItem(getTeamKey(team));
    if (saved) return normalizeTasks(JSON.parse(saved));
  } catch {
    localStorage.removeItem(getTeamKey(team));
  }

  return normalizeTasks(team.team_tasks ?? team.tasks ?? []);
};

export const saveProjectTasks = (team = {}, tasks = []) => {
  localStorage.setItem(getTeamKey(team), JSON.stringify(normalizeTasks(tasks)));
};

export const calculateProgress = (tasks = [], fallback = 0) => {
  const normalized = normalizeTasks(tasks);
  if (normalized.length === 0) return fallback;
  const completed = normalized.filter((task) => task.checked).length;
  return Math.round((completed / normalized.length) * 100);
};
