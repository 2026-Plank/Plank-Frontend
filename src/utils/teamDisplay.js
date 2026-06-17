const pad2 = (value) => String(value).padStart(2, "0");

export const formatToday = () => {
  const today = new Date();
  return `${pad2(today.getMonth() + 1)}/${pad2(today.getDate())}`;
};

export const formatDateText = (value) => {
  if (!value) return "";
  const text = String(value).trim();
  const date = new Date(text);
  if (Number.isNaN(date.getTime())) return text;
  return `${pad2(date.getMonth() + 1)}/${pad2(date.getDate())}`;
};

export const formatTeamPeriod = (team = {}) => {
  const rawPeriod = String(team.period ?? "").trim();
  const deadline = formatDateText(team.deadline);

  if (rawPeriod && !rawPeriod.startsWith("~") && !rawPeriod.startsWith("-")) {
    return rawPeriod;
  }

  const endDate = rawPeriod.replace(/^[~-]\s*/, "").trim() || deadline;
  return endDate ? `${formatToday()} ~ ${endDate}` : "";
};

export const getMemberDepartments = (members = []) => {
  const departments = members
    .flatMap((member) => {
      if (member.department) return [member.department];
      if (Array.isArray(member.join_team)) return member.join_team;
      if (typeof member.join_team === "string") return member.join_team.split(",");
      return [];
    })
    .map((department) => String(department).trim())
    .filter(Boolean);

  return [...new Set(departments)];
};

export const formatTeamCharge = (team = {}) => {
  const departments = getMemberDepartments(team.members);
  if (departments.length > 0) return departments.join(", ");
  return team.charge || team.department || "";
};
