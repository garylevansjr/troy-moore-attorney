export interface FormPayload {
  form_name: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  help_with?: string[];
  services?: string[];
  sms_consent?: boolean;
  [key: string]: unknown;
}

export async function submitForm(payload: FormPayload): Promise<void> {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );

  const data = {
    ...payload,
    page: typeof window !== "undefined" ? window.location.pathname : null,
    referrer: typeof document !== "undefined" ? document.referrer || null : null,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
  };

  const res = await fetch("/api/submit-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Submission failed");
}
