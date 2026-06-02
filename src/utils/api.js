const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const getAuthToken = () => localStorage.getItem("token");

export const setAuthSession = ({ token, user }) => {
  if (token) localStorage.setItem("token", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const apiRequest = async (path, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    const message = data?.error || data?.message || "요청 처리 중 오류가 발생했습니다.";
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const toDisplayDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
};

export const toApiDate = (value) => {
  if (!value) return "";
  const trimmed = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;

  const rangeEnd = trimmed.split(/\s*-\s*|\s*~\s*/).pop();
  const normalized = rangeEnd.replace(/[./]/g, "-");
  const parts = normalized.split("-").filter(Boolean);
  if (parts.length === 2) {
    const year = new Date().getFullYear();
    const [month, day] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${year.padStart(4, "20")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return trimmed;
};

export const mapApiTeam = (team) => {
  const deadline = toDisplayDate(team?.deadline);
  const members = Array.isArray(team?.members)
    ? team.members.map((member) => ({
        ...member,
        name: member.name || member.id || "이름 없음",
        join_team: member.department ? [member.department] : [],
      }))
    : [];

  const departments = [...new Set(members.flatMap((member) => member.join_team).filter(Boolean))];
  const groups = departments.length > 0 ? departments : ["기획자", "개발자", "디자이너"];

  return {
    id: team?.id ?? null,
    title: team?.name || team?.title || "프로젝트 명",
    period: deadline ? `~ ${deadline}` : team?.period || "",
    code: team?.teamCode || team?.code || "",
    charge: team?.dpName || team?.charge || "팀 프로젝트",
    progress: team?.progress ?? 0,
    description: team?.description || team?.dpName || "프로젝트 설명",
    members,
    team_explan: groups.map((group) => ({ join_team: group, explan: "업무 내용을 작성해 주세요." })),
    team_deadline: groups.map((group) => ({ join_team: group, deadline: deadline ? `~ ${deadline}` : "-" })),
    hidden: false,
    raw: team,
  };
};
