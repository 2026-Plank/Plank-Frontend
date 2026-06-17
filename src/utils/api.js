export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const normalizeApiMessage = (message) => {
  const text = String(message || "");
  if (
    text.includes("NJS-") ||
    text.includes("ECONNREFUSED") ||
    text.includes("DPI-") ||
    text.includes("ORA-12170") ||
    text.includes("ORA-125")
  ) {
    return "데이터베이스에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.";
  }
  return text;
};

export const getAuthToken = () => localStorage.getItem("token");

export const setAuthSession = ({ token, user }) => {
  if (token) localStorage.setItem("token", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("teamId");
};

export const apiRequest = async (path, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      const looksLikeHtml = /^\s*</.test(text);
      data = {
        message: looksLikeHtml
          ? "API 서버 응답이 아니라 프론트 페이지가 반환되었습니다. Vercel 환경변수 VITE_API_BASE_URL에 백엔드 주소를 설정해 주세요."
          : text
      };
    }
  }

  if (!response.ok || !data) {
    const message = normalizeApiMessage(data?.message || data?.error || "서버에서 빈 응답을 받았습니다.");
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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

  return {
    id: team?.id ?? null,
    title: team?.name || team?.title || "프로젝트 이름 없음",
    period: deadline ? `~ ${deadline}` : team?.period || "",
    code: team?.teamCode || team?.code || "",
    charge: team?.charge || "",
    progress: team?.progress ?? 0,
    description: team?.description || "",
    members,
    team_explan: Array.isArray(team?.team_explan) ? team.team_explan : [],
    team_deadline: Array.isArray(team?.team_deadline) ? team.team_deadline : [],
    hidden: Boolean(team?.hidden),
    raw: team,
  };
};
