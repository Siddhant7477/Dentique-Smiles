export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";

function getProjectIdFromUrl(url) {
  try {
    return new URL(url).hostname.split(".")[0] || "";
  } catch {
    return "";
  }
}

export const projectId =
  process.env.REACT_APP_SUPABASE_PROJECT_ID || getProjectIdFromUrl(supabaseUrl);

export const publicAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

export const serverFunctionName =
  process.env.REACT_APP_SUPABASE_FUNCTION_NAME || "make-server-0bee321a";

export const hasSupabaseConfig = Boolean(supabaseUrl && publicAnonKey);

export function appointmentsEndpoint(id) {
  const baseUrl = `${supabaseUrl}/rest/v1/appointments`;
  return id ? `${baseUrl}?id=eq.${id}` : baseUrl;
}
